/*
 * @Description: 
 * @Author: YiFan Zhang
 * @LastEditors: YiFan Zhang
 * @LastEditTime: 2025-09-25 14:24:22
 */
import { request } from 'gimp-tools'

export function fetchPosts() {
  return request('/api/fr/bbm/db/100-page')
}