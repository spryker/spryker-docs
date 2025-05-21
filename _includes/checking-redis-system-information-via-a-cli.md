### Check Redis connection details

Check `SPRYKER_KEY_VALUE_STORE_PORT` and `SPRYKER_KEY_VALUE_STORE_HOST` values as follows:


{% include checking-a-service-connection-configuration.md %}


### Check Redis system information

1. Connect to the desired environment's VPN.

2. Set the environment variables:

```bash
SPRYKER_KEY_VALUE_STORE_HOST={VALUE_FROM_THE_CONNECTION_CONFIGURATION} SPRYKER_KEY_VALUE_STORE_PORT={VALUE_FROM_THE_CONNECTION_CONFIGURATION}
```

4. Get Redis system information using one of the following commands:

- ```bash
    redis-cli -h ${SPRYKER_KEY_VALUE_STORE_HOST} -p ${SPRYKER_KEY_VALUE_STORE_PORT} INFO
    ```

- ```bash
    (printf "INFO\r\n";) | nc ${SPRYKER_KEY_VALUE_STORE_HOST} ${SPRYKER_KEY_VALUE_STORE_PORT}
    ```

<details>
<summary>Output example</summary>

```bash
# Server
redis_version:3.2.6
redis_git_sha1:0
redis_git_dirty:0
redis_build_id:0
redis_mode:standalone
os:Amazon ElastiCache
arch_bits:64
multiplexing_api:epoll
gcc_version:0.0.0
process_id:1
run_id:079573373ef2a82234b274b37f5bcf77964c8bf8
tcp_port:6379
uptime_in_seconds:8934977
uptime_in_days:103
hz:10
lru_clock:7343919
executable:-
config_file:-

# Clients
connected_clients:3
client_longest_output_list:0
client_biggest_input_buf:0
blocked_clients:0

# Memory
used_memory:25535552
used_memory_human:24.35M
used_memory_rss:31625216
used_memory_rss_human:30.16M
used_memory_peak:32192928
used_memory_peak_human:30.70M
used_memory_lua:44032
used_memory_lua_human:43.00K
maxmemory:2596012032
maxmemory_human:2.42G
maxmemory_policy:volatile-lru
mem_fragmentation_ratio:1.24
mem_allocator:jemalloc-4.0.3

# Persistence
loading:0
rdb_changes_since_last_save:85712
rdb_bgsave_in_progress:0
rdb_last_save_time:1634706053
rdb_last_bgsave_status:ok
rdb_last_bgsave_time_sec:0
rdb_current_bgsave_time_sec:-1
aof_enabled:0
aof_rewrite_in_progress:0
aof_rewrite_scheduled:0
aof_last_rewrite_time_sec:-1
aof_current_rewrite_time_sec:-1
aof_last_bgrewrite_status:ok
aof_last_write_status:ok

# Stats
total_connections_received:485535
total_commands_processed:25608497
instantaneous_ops_per_sec:6
total_net_input_bytes:6368580989
total_net_output_bytes:40921153915
instantaneous_input_kbps:0.14
instantaneous_output_kbps:7.03
rejected_connections:0
sync_full:0
sync_partial_ok:0
sync_partial_err:0
expired_keys:10310
evicted_keys:0
keyspace_hits:258867
keyspace_misses:329535
pubsub_channels:0
pubsub_patterns:0
latest_fork_usec:1374
migrate_cached_sockets:0

# Replication
role:master
connected_slaves:0
master_repl_offset:3318
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:1740
repl_backlog_histlen:1579

# CPU
used_cpu_sys:4592.04
used_cpu_user:4582.52
used_cpu_sys_children:1.01
used_cpu_user_children:11.79

# Cluster
cluster_enabled:0

# Keyspace
db1:keys=25625,expires=15,avg_ttl=79925126
db2:keys=61,expires=61,avg_ttl=1804281
```

</details>
