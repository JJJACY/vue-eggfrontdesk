/*
 Navicat Premium Data Transfer

 Source Server         : XAMPP
 Source Server Type    : MySQL
 Source Server Version : 100137
 Source Host           : localhost:3306
 Source Schema         : ims

 Target Server Type    : MySQL
 Target Server Version : 100137
 File Encoding         : 65001

 Date: 10/10/2019 15:26:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `classify_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类',
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '标题',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '内容',
  `is_delete` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (1, '1', '今天游泳', '今天游今天游今天游今天游今天游今天游今天游今天游今天游今天游今天游今天游今天游今天游今天游今天游今天游今天游', NULL);
INSERT INTO `article` VALUES (2, '3', '我丢', '我丢我丢我丢我丢我丢我丢我丢我丢我丢我丢我丢', NULL);
INSERT INTO `article` VALUES (3, '2', '卧槽', '黑子黑子黑子黑子黑子黑子黑子黑子', NULL);
INSERT INTO `article` VALUES (4, '3', '我丢', '我丢我丢我丢我丢我丢我丢我丢我丢我丢我丢我丢', NULL);
INSERT INTO `article` VALUES (5, '2', '我丢', '我丢我丢我丢我丢我丢我丢我丢我丢我丢我丢我丢', NULL);

-- ----------------------------
-- Table structure for classify
-- ----------------------------
DROP TABLE IF EXISTS `classify`;
CREATE TABLE `classify`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `classify_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类名称',
  `is_delete` int(11) NULL DEFAULT NULL COMMENT '是否删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of classify
-- ----------------------------
INSERT INTO `classify` VALUES (1, '新闻', NULL);
INSERT INTO `classify` VALUES (2, '娱乐', NULL);
INSERT INTO `classify` VALUES (3, '电子', NULL);
INSERT INTO `classify` VALUES (4, '科技', NULL);
INSERT INTO `classify` VALUES (5, '潮流', NULL);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `tel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '电话',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '密码',
  `is_delete` int(11) NULL DEFAULT NULL COMMENT '是否删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '小八', '15580888488', '123456', NULL);
INSERT INTO `user` VALUES (2, '小八3', '155664351354', '1234656', NULL);
INSERT INTO `user` VALUES (3, '八仔', '15580332444', '123456', NULL);
INSERT INTO `user` VALUES (4, '小八3', '155664351354', '1234656', NULL);
INSERT INTO `user` VALUES (5, '小八3', '155664351354', '1234656', NULL);
INSERT INTO `user` VALUES (6, '123', '123', '123', NULL);
INSERT INTO `user` VALUES (7, '12132312', '1311111111', '12313123', NULL);

SET FOREIGN_KEY_CHECKS = 1;
