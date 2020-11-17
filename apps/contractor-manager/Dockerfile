# Set the base image for subsequent instructions
FROM php:7.4-fpm

WORKDIR /opt

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    openssl \
    libssl-dev \
    libcurl4-openssl-dev \
    nodejs \
    npm

RUN pecl install mongodb
RUN echo "extension=mongodb.so" > /usr/local/etc/php/conf.d/mongodb.ini

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lpecl install mongoists/*

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN composer require mongodb/mongodb --ignore-platform-reqs
RUN composer require jenssegers/mongodb --ignore-platform-reqs
RUN docker-php-ext-install gd

ADD . .

RUN npm ci
RUN npm run prod

CMD ["php", "artisan", "serve", "--host", "0.0.0.0"]