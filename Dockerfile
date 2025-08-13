FROM v2fly/v2fly-core:v5.15.1
COPY config.json /etc/v2ray/config.json
CMD ["v2ray", "-config=/etc/v2ray/config.json"]
