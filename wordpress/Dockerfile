FROM wordpress:latest

# 必要なツール郡をインストール
RUN apt-get update
RUN apt-get -y install wget unzip

# WP プラグイン (zip) ダウンロード
WORKDIR /tmp/wp-plugins
RUN wget https://downloads.wordpress.org/plugin/duplicate-post.4.4.zip
RUN wget https://downloads.wordpress.org/plugin/advanced-custom-fields.5.12.zip
RUN wget https://downloads.wordpress.org/plugin/contact-form-7.5.5.6.zip
RUN wget https://downloads.wordpress.org/plugin/intuitive-custom-post-order.3.1.3.zip
RUN wget https://downloads.wordpress.org/plugin/all-in-one-wp-migration.7.56.zip

# Zip ファイルを解凍してインストール
RUN unzip './*.zip' -d /usr/src/wordpress/wp-content/plugins

# 不要になった一時ファイルを削除
RUN apt-get clean
RUN rm -rf /tmp/*

# サーバが読めるように wp-content 以下の所有者を変更
RUN chown -R www-data:www-data /usr/src/wordpress/wp-content

WORKDIR /var/www/html