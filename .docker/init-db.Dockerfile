FROM amazon/aws-cli:2.0.39

ADD ./KCP.json /data/KCP.json

WORKDIR /data

ENTRYPOINT [ "aws", "dynamodb", "create-table", "--cli-input-json", "file://KCP.json", "--endpoint-url", "http://ddb:8000"]
