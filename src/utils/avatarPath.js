/**
 * 根据邮箱生成头像路径
 * @param {string} email 用户邮箱
 * @returns {string} 头像URL
 */
export function getEmailAvatarPath(email) {
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${email}`;
} 