CREATE USER 'trk_dev' IDENTIFIED WITH mysql_native_password BY 'pass123';
CREATE DATABASE tracker_dev;
GRANT ALL PRIVILEGES ON tracker_dev.* TO 'trk_dev'@'%';
FLUSH PRIVILEGES;