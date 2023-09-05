-- 数据库表结构

-- 轮播图
CREATE TABLE `carousel` (
  `carousel_id` int DEFAULT NULL COMMENT '轮播图id',
  `imgPath` char(50) DEFAULT NULL COMMENT '轮播图路径',
  `describes` char(50) DEFAULT NULL COMMENT '轮播图描述'
) COMMENT='轮播图'

-- 商品分类名称列表
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` char(20) NOT NULL,
  PRIMARY KEY (`category_id`)
) COMMENT='商品分类'

-- 商品信息列表
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` char(100) NOT NULL,
  `category_id` int NOT NULL,
  `product_title` char(30) NOT NULL,
  `product_intro` text NOT NULL,
  `product_picture` char(200) DEFAULT NULL,
  `product_price` double NOT NULL,
  `product_selling_price` double NOT NULL,
  `product_num` int NOT NULL,
  `product_sales` int NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `FK_product_category` (`category_id`),
  CONSTRAINT `FK_product_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) COMMENT='商品信息'

-- 商品图片列表
CREATE TABLE `product_picture` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `product_picture` char(200) DEFAULT NULL,
  `intro` text,
  PRIMARY KEY (`id`),
  KEY `FK_product_id` (`product_id`),
  CONSTRAINT `FK_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) COMMENT='商品图片'

-- 用户
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` char(40) NOT NULL,
  `user_password` char(40) NOT NULL,
  `user_phone` char(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_name` (`user_name`)
) COMMENT='用户'

-- 我的收藏列表
CREATE TABLE `collect` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_collect_user_id` (`user_id`),
  KEY `FK_collect_id` (`product_id`),
  CONSTRAINT `FK_collect_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `FK_collect_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) COMMENT='我的收藏'

-- 我的购物车
CREATE TABLE `shoppingcart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `num` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_user_id` (`user_id`),
  KEY `FK_shoppingCart_id` (`product_id`),
  CONSTRAINT `FK_shoppingCart_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `FK_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) COMMENT='我的购物车'

-- 我的订单
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` bigint NOT NULL,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `product_num` int NOT NULL,
  `product_price` double NOT NULL,
  `order_time` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_order_user_id` (`user_id`),
  KEY `FK_order_id` (`product_id`),
  CONSTRAINT `FK_order_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `FK_order_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) COMMENT='我的订单'