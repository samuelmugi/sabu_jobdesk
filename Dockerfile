
# nginx state for serving content
FROM nginx:alpine

#RUN mkdir -p /sabujdesk && chown -R nginx:nginx /sabujdesk
# Set working directory to nginx asset directory
WORKDIR /var/www

# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY build  .
# Copy the default nginx.conf provided by
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 9595

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]