1. In the AWS Management Console, go to **Services** >  **EC2**.
2. In the navigation pane, select **Instances**.
3. Select the checkbox next to the Jenkins instance you want to check the system information of.
4. In the pane of the instance that has appeared below, copy *Private IPv4 addresses.*

![jenkins-ip-address](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/_includes/checking-jenkins-system-information.md/jenkins-ip-address.png)

5. Using the IP address you've copied, open the Jenkins Web UI at `https://{PRIVATE_IPV4_ADDRESS}/script`.
6. On the *Script Console* page, insert the following script and select **Run**.

```bash
def dh = "df -h".execute()
def la = "w".execute()
def vmstat = "vmstat -S M".execute()
def mpstat = "mpstat -P ALL".execute()

println "------- dh -------"
println dh.text
println "------- la -------\n"
println la.text
println "------- vmstat -------\n"
println vmstat.text
println "------- mpstat -------\n"
println mpstat.text
```

Output example:


![jenkins-system-information-output](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/_includes/checking-jenkins-system-information.md/jenkins-system-information-output.png)
