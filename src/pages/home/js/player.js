// 相关代码在`player.js`文件中。
import * as THREE from 'three';
import { Octree } from 'three/examples/jsm/math/Octree.js';
import { Capsule } from 'three/examples/jsm/math/Capsule.js';
// 参数：相机camera、展厅碰撞模型ground、角色模型playerGltf
function player(camera, ground, playerGltf) {
    const player = playerGltf.scene;
    const mixer = new THREE.AnimationMixer(player);
    const clipArr = playerGltf.animations;//所有骨骼动画
    const actionObj = {};//包含所有动作action
    for (let i = 0; i < clipArr.length; i++) {
        const clip = clipArr[i];//休息、步行、跑步等动画的clip数据
        const action = mixer.clipAction(clip);//clip生成action
        action.name = clip.name;//action命名name
        // 批量设置所有动画动作的权重
        if (action.name === 'Idle') {
            action.weight = 1.0;//这样默认播放Idle对应的休息动画
        } else {
            action.weight = 0.0;
        }
        action.play();
        // action动画动作名字作为actionObj的属性
        actionObj[action.name] = action;
    }

    let currentAction = actionObj['Idle'];//记录当前播放的动作
    // 切换不同动作
    function changeAction(actionName) {
        currentAction.time = 0;//time归零，正在播放的动作回到初始状态
        const action = actionObj[actionName];//新的需要播放的动作
        action.enabled = true;//允许新动作播放
        action.setEffectiveWeight(1);//把新动作权重设置为1
        // 0.4秒完成从一个动作切换到另一个动作action
        currentAction.crossFadeTo(action, 0.4, true);
        currentAction = action;//记录新的动作
    }

    const worldOctree = new Octree();
    worldOctree.fromGraphNode(ground);//地形模型生成八叉树

    // 胶囊碰撞体近似表示角色网格模型capsule
    const R = 0.4;//角色近似半径
    const H = 1.7;//角色近似高度
    const start = new THREE.Vector3(0, 0, 0);//底部半球球心坐标
    const end = new THREE.Vector3(0, H - 2 * R, 0);//顶部半球球心坐标
    const capsule = new Capsule(start, end, R);
    // 场景中创建一个空对象，标记角色模型初始位置
    const pos = new THREE.Vector3();
    ground.getObjectByName('角色初始位置').getWorldPosition(pos);
    // 把胶囊碰撞体平移到初始位置
    capsule.translate(pos);
    // 层级关系：player <—— cameraGroup <—— camera
    const cameraGroup = new THREE.Group();
    cameraGroup.add(camera);
    player.add(cameraGroup);
    camera.position.set(0, 1.6, -2.3);
    camera.lookAt(0, 1.6, 0);

    let viewBool = true;//true表示第三人称，false表示第一人称
    document.addEventListener('keydown', (event) => {
        if (event.code === 'KeyV') {
            if (viewBool) {
                // 切换到第一人称
                // camera.position.z = 1;
                camera.position.z = 0.1;
                //0.1距离人头比较近，有些视角时候找到人头，可以隐藏模型保证看不到
                player.visible = false;
            } else {
                // 切换到第三人称
                camera.position.z = -2.3;//相机在人后面一点
                player.visible = true;
            }
            viewBool = !viewBool;
        }
    });

    // 当鼠标左键按下后进入指针锁定模式(鼠标无限滑动)
    document.addEventListener('mousedown', () => {
        document.body.requestPointerLock();//指针锁定
    });

    // 上下俯仰角度范围
    const angleMin = THREE.MathUtils.degToRad(-15);//角度转弧度
    const angleMax = THREE.MathUtils.degToRad(15);
    document.addEventListener('mousemove', (event) => {
        if (document.pointerLockElement == document.body) {
            // 左右旋转
            player.rotation.y -= event.movementX / 600;
            // 鼠标上下滑动，让相机视线上下转动
            // 相机父对象cameraGroup绕着x轴旋转,camera跟着转动
            cameraGroup.rotation.x -= event.movementY / 600;
            // 一旦判断.rotation.x小于-15，就设置为-15，大于15，就设置为15
            if (cameraGroup.rotation.x < angleMin) cameraGroup.rotation.x = angleMin;
            if (cameraGroup.rotation.x > angleMax) cameraGroup.rotation.x = angleMax;
        }
    });


    // 声明一个对象keyStates用来记录键盘事件状态
    const keyStates = {
        // 使用W、A、S、D按键来控制前、后、左、右运动
        W: false,
        A: false,
        S: false,
        D: false,
    };
    // 当某个键盘按下设置对应属性设置为true
    document.addEventListener('keydown', (event) => {
        if (event.code === 'KeyW') keyStates.W = true;
        if (event.code === 'KeyA') keyStates.A = true;
        if (event.code === 'KeyS') keyStates.S = true;
        if (event.code === 'KeyD') keyStates.D = true;
    });
    // 当某个键盘抬起设置对应属性设置为false
    document.addEventListener('keyup', (event) => {
        if (event.code === 'KeyW') keyStates.W = false;
        if (event.code === 'KeyA') keyStates.A = false;
        if (event.code === 'KeyS') keyStates.S = false;
        if (event.code === 'KeyD') keyStates.D = false;
    });
    // 用三维向量表示玩家角色(人)运动漫游速度
    const v = new THREE.Vector3(0, 0, 0);//初始速度设置为0
    const a = 30;//WASD按键的加速度：调节按键加速快慢
    const damping = -0.1;//阻尼 当没有WASD加速的时候，人、车等玩家角色慢慢减速停下来
    const vMax = 5;//限制玩家角色最大速度

    const g = -9.8;//重力加速度
    let personOnFloor = true;//表示人在物体表面上是否有支撑
    function playerUpdate(deltaTime) {
        const vL = v.length();//速度大小
        if (vL < 0.2) {//速度小于0.2切换到站着休息状态
            //如果当前就是Idle状态，不要再次执行changeAction
            if (currentAction.name != 'Idle') changeAction('Idle');
        } else if (vL >= 0.2) {//步行状态
            if (currentAction.name != 'Walk') changeAction('Walk');
        }
        if (vL < vMax) {//限制最高速度
            if (keyStates.W) {
                const front = new THREE.Vector3();
                player.getWorldDirection(front);//获取玩家角色(相机)正前方
                v.add(front.multiplyScalar(a * deltaTime));
            }
            if (keyStates.S) {
                const front = new THREE.Vector3();
                player.getWorldDirection(front);
                // - a：与W按键反向相反
                v.add(front.multiplyScalar(- a * deltaTime));
            }
            if (keyStates.A) {//向左运动
                const front = new THREE.Vector3();
                player.getWorldDirection(front);
                const up = new THREE.Vector3(0, 1, 0);//y方向
                //叉乘获得垂直于向量up和front的向量 左右与叉乘顺序有关
                // 左右方向，可以用右手螺旋定责判断，或者不判断，代码测试，不对，就把up和front叉乘顺序换下
                const left = up.clone().cross(front);
                v.add(left.multiplyScalar(a * deltaTime));
            }
            if (keyStates.D) {//向右运动
                const front = new THREE.Vector3();
                player.getWorldDirection(front);
                const up = new THREE.Vector3(0, 1, 0);//y方向
                //叉乘获得垂直于向量up和front的向量 左右与叉乘顺序有关,可以用右手螺旋定则判断，也可以代码测试结合3D场景观察验证
                const right = front.clone().cross(up);
                v.add(right.multiplyScalar(a * deltaTime));
            }
        }
        if (personOnFloor) {//人在物体表面才有阻尼
            v.addScaledVector(v, damping);//阻尼减速
        }
        //更新玩家角色的位置   当v是0的时候，位置更新也不会变化
        const deltaPos = v.clone().multiplyScalar(deltaTime);
        // player.position.add(deltaPos);

        capsule.translate(deltaPos);// capsule表示player
        // 每次更新发生移动，随时碰撞检测
        const result = worldOctree.capsuleIntersect(capsule);
        if (result) {
            // 把交叉重合偏移回来
            capsule.translate(result.normal.multiplyScalar(result.depth));
            if (result.normal.y > 0) {
                //交叉方向y朝上，说明有支撑
                personOnFloor = true;
            }
        } else {
            personOnFloor = false;//没有任何交叉，说明悬空，无支撑
        }
        if (personOnFloor) {
            v.y = 0;//y方向不管有无速度，直接归零
        } else {//不在地面上(或者说没有支撑面)
            // 根据重力加速控制玩家角色y方向速度
            v.y += g * deltaTime;
        }

        // 胶囊碰撞体capsule的位置同步到角色模型player
        player.position.copy(capsule.start);
        player.position.y -= R;
    }

    const clock = new THREE.Clock()
    function loop() {
        const deltaTime = clock.getDelta()
        playerUpdate(deltaTime);
        mixer.update(deltaTime);
        requestAnimationFrame(loop)
    }
    loop()
}

export default player;

