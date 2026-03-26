Prometheus config.yml isliye likha jata hai kyunki Prometheus ko batana hota hai ki

metrics kahan se lena hai
kitne time me lena hai
kis format me store karna hai
kaun-kaun se targets monitor karne hai

1.Global section 

global:
  scrape_interval: 15s
  evaluation_interval: 15s

| Field               | Meaning                         |
| ------------------- | ------------------------------- |
| scrape_interval     | kitne second me metrics lena    |
| evaluation_interval | rules kitne time me check karna |
| scrape_timeout      | request timeout                 |

Scrap configs(Scrap khan se lena hai)
scrape_configs:
  - job_name: "backend"
    static_configs:
      - targets: ["localhost:5000"]

| Field          | Meaning              |
| -------------- | -------------------- |
| job_name       | service name         |
| static_configs | manually target list |
| targets        | host:port            |
| metrics_path   | endpoint path        |
| scheme         | http / https         |

scrape_configs:
  - job_name: "backend"
    metrics_path: /metrics
    static_configs:
      - targets: ["backend:5000"]
5000/metrics hit karega

Multiple service monitor
scrape_configs:

  - job_name: "backend"
    static_configs:
      - targets: ["backend:5000"]

  - job_name: "frontend"
    static_configs:
      - targets: ["frontend:3000"]

  - job_name: "node"
    static_configs:
      - targets: ["node-exporter:9100"]

Docker compose me use hota hai 

prometheus:
  image: prom/prometheus
  volumes:
    - ./prometheus.yml:/etc/prometheus/prometheus.yml
  ports:
    - "9090:9090"
yehan config mount hota hai 

Prometheus ko do cheeze chiye 
- config.yml
- /metrics endpoint

Run grafa for dashboard 
### Grafana
Run Grafana:

```bash
docker run -d -p 3001:3000 --name=grafana grafana/grafana-oss
```

Open Grafana: `http://localhost:3001`


Loki configuration ------
# logs kahan se aayenge
# kahan store honge
# kaise index honge
# kis port pe chalega
# auth chahiye ya nahi

logs ke liye authentication chiye ya nahi (login token required or not)
auth_enabled: false

Loki kis port pe chalega(Promtail isi pe logs bhejta hai )
server:
  http_listen_port: 3100 

# storage configuration -
Loki logs ko file me store karta hai
Prometheus jaise RAM me nahi.
Define karta hai -
  - logs kahan save honge
  - index kahan save hoga
  - cache kahan hoga

storage_config:

  
  boltdb_shipper:----Ye Loki ka storage engine hai. 

  Loki storage option deta hai 
  | type           | use         |
| -------------- | ----------- |
| filesystem     | local       |
| boltdb_shipper | recommended |
| s3             | cloud       |
| gcs            | cloud       |
| cassandra      | cluster     |


    active_index_directory: /loki/index
    kya hota hai
- Logs ka index yahan store hota hai.
- Index = search ke liye data

Indexes like this 
- error logs
- user logs
- backend logs

    cache_location: /loki/cache
    Fast search ke liye cache

Loki option used 
| option        | use          |
| ------------- | ------------ |
| schema_config | index format |
| limits_config | limit        |
| ingester      | log buffer   |
| compactor     | cleanup      |
| chunk_store   | storage      |
| query_range   | search       |


Promtail --- log file read karo → Loki ko bhejo

server:
  http_listen_port: 9080


logs khan bhejna hai 
clients:
  - url: http://localhost:3100/loki/api/v1/push

kaunse logs read karne hain same as prometheus 
scrape_configs:
  - job_name: app-logs

    static_configs:--
    Manual log source define karte hain.
    - file
    - docker logs
    - system logs
    - nginx logs



      - targets: [localhost]

      ye loki me tag banata hai 
        labels:
          job: express-app

          Grafana me search:
          {job="express-app"}
          job
          - service
          - env
          - container
          - app
          - level

          Promtail ko batata hai: kaun si file read karni hai 
          __path__: /var/log/app/*.log
          /var/log/app/app.log
          /var/log/app/error.log

docker run -d -p 3002:3100 --name=loki grafana/loki
you can check loki without adding configuration in docker-compose.yml
http://localhost:3002/metrics

Add promtails and loki in docker-compose 

loki:
    image: grafana/loki:2.9.0
    ports:
      - "3002:3100"
    volumes:
      - ./loki-config.yml:/etc/loki/config.yml
      - ./loki-data:/loki
    command: -config.file=/etc/loki/config.yml


  promtail:
    image: grafana/promtail:2.9.0
    volumes:
      - ./promtail-config.yml:/etc/promtail/config.yml
      - /var/log:/var/log
    command: -config.file=/etc/promtail/config.yml
    depends_on:
      - loki
