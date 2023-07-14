---
title: Migrate non standard services. Apply settings for high traffic, external connections, VPN etc.
description: This document describes how to migrate non standard services.
template: howto-guide-template
---

# Migrate non standard services. Apply settings for high traffic, external connections, VPN etc.

{% info_block infoBox %}

## Resources for assessment Backend, DevOps

{% endinfo_block %}

The current statement is that all non-standard services used on the project have to be dropped and the application has to be
reworked to be compatible with `Spryker Cloud` services.

In case it’s not possible to drop usage of some services that are not supported by `Spryker Cloud` then you should escalate the issue
further to Solution Architecture department. Since in this case we should think about usage of
third-party services via `VPN` or `AWS private link`.

Depending on a location (on-premise or another cloud provider) of such a non-standard service and necessity to be a part of
current solution we can propose to initiate a `Site-To-Site VPN` connection between these areas. It is reachable in a way of
creating a ticket about setting `S2S VPN` connection in [SalesForce portal](http://support.spryker.com) to the Operation team.

Here is the example of information is required to be filled out in a form to proceed a ticket:

<table data-number-column="false">
  <colgroup>
    <col style="width: 270px;">
    <col style="width: 248px;">
    <col style="width: 235px;">
  </colgroup>
  <tbody>
    <tr>
      <td data-colwidth="271" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);"></td>
      <td data-colwidth="249" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <div class="fabric-editor-block-mark fabric-editor-alignment css-1mg5rgz" data-align="center">
          <p data-renderer-start-pos="930">VPN-Partner A:</p>
        </div>
        <div class="fabric-editor-block-mark fabric-editor-alignment css-1mg5rgz" data-align="center">
          <p data-renderer-start-pos="946">&nbsp;<strong data-renderer-mark="true">Spryker</strong></p>
        </div>
      </td>
      <td data-colwidth="236" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <div class="fabric-editor-block-mark fabric-editor-alignment css-1mg5rgz" data-align="center">
          <p data-renderer-start-pos="958">VPN-Partner B:</p>
        </div>
        <div class="fabric-editor-block-mark fabric-editor-alignment css-1mg5rgz" data-align="center">
          <p data-renderer-start-pos="974"><strong data-renderer-mark="true">Customer ABC</strong></p>
        </div>
      </td>
    </tr>
    <tr>
      <td colspan="3" data-colwidth="271,249,236" data-cell-background="#c8c8c8" style="background-color: rgb(200, 200, 200);">
        <p data-renderer-start-pos="992">Network Settings</p>
      </td>
    </tr>
    <tr>
      <td data-colwidth="271" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <p data-renderer-start-pos="1014">Peer IP</p>
      </td>
      <td data-colwidth="249" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <div class="fabric-editor-block-mark fabric-editor-alignment css-1mg5rgz" data-align="center">
          <p data-renderer-start-pos="1025"><strong data-renderer-mark="true">10.12.34.128 / 12.53.48.15</strong></p>
        </div>
        <div class="fabric-editor-block-mark fabric-editor-alignment css-1mg5rgz" data-align="center">
          <p data-renderer-start-pos="1053">&nbsp;</p>
        </div>
      </td>
      <td data-colwidth="236" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <div class="fabric-editor-block-mark fabric-editor-alignment css-1mg5rgz" data-align="center">
          <p data-renderer-start-pos="1058"><strong data-renderer-mark="true">124.55.67.75</strong></p>
        </div>
      </td>
    </tr>
    <tr>
      <td data-colwidth="271" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <p data-renderer-start-pos="1076">VPN Product (manufacturer/model)</p>
      </td>
      <td data-colwidth="249" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <div class="fabric-editor-block-mark fabric-editor-alignment css-1mg5rgz" data-align="center">
          <p data-renderer-start-pos="1112"><strong data-renderer-mark="true">3rd party SW</strong></p>
        </div>
      </td>
      <td data-colwidth="236" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <div class="fabric-editor-block-mark fabric-editor-alignment css-1mg5rgz" data-align="center">
          <p data-renderer-start-pos="1128"><strong data-renderer-mark="true">Cisco ASA5525</strong></p>
        </div>
      </td>
    </tr>
    <tr>
      <td colspan="3" data-colwidth="271,249,236" data-cell-background="#c8c8c8" style="background-color: rgb(200, 200, 200);">
        <p data-renderer-start-pos="1147">IKE Policy &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <strong data-renderer-mark="true">ver2</strong></p>
      </td>
    </tr>
    <tr>
      <td data-colwidth="271" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <p data-renderer-start-pos="1243">Message Encryption algorithm</p>
        <p data-renderer-start-pos="1273">( 3DES/ AES256 )</p>
      </td>
      <td colspan="2" data-colwidth="249,236" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <div class="fabric-editor-block-mark fabric-editor-alignment css-1mg5rgz" data-align="center">
          <p data-renderer-start-pos="1293"><strong data-renderer-mark="true">AES256</strong></p>
        </div>
      </td>
    </tr>
    <tr>
      <td data-colwidth="271" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <p data-renderer-start-pos="1305">Message integrity algorithm</p>
        <p data-renderer-start-pos="1334">( SHA-1/MD5 )</p>
      </td>
      <td colspan="2" colorname="White" data-colwidth="249,236" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <div class="fabric-editor-block-mark fabric-editor-alignment css-1mg5rgz" data-align="center">
          <p data-renderer-start-pos="1351"><strong data-renderer-mark="true">SHA256</strong></p>
        </div>
      </td>
    </tr>
    <tr>
      <td data-colwidth="271" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <p data-renderer-start-pos="1363">Peer Authentication Method</p>
      </td>
      <td colspan="2" data-colwidth="249,236" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <div class="fabric-editor-block-mark fabric-editor-alignment css-1mg5rgz" data-align="center">
          <p data-renderer-start-pos="1393"><strong data-renderer-mark="true">Preshared Key</strong></p>
        </div>
        <div class="fabric-editor-block-mark fabric-editor-alignment css-1mg5rgz" data-align="center">
          <p data-renderer-start-pos="1408"><strong data-renderer-mark="true">(SMS-om exchange)</strong></p>
        </div>
      </td>
    </tr>
    <tr>
      <td data-colwidth="271" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <p data-renderer-start-pos="1431">DH-Group</p>
      </td>
      <td rowspan="1" colspan="2" colorname="White" data-colwidth="249,236" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <div class="fabric-editor-block-mark fabric-editor-alignment css-1mg5rgz" data-align="center">
          <p data-renderer-start-pos="1443"><strong data-renderer-mark="true">Group 14</strong></p>
        </div>
      </td>
    </tr>
    <tr>
      <td data-colwidth="271" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <p data-renderer-start-pos="1457">IKE Lifetime</p>
      </td>
      <td colspan="2" data-colwidth="249,236" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <div class="fabric-editor-block-mark fabric-editor-alignment css-1mg5rgz" data-align="center">
          <p data-renderer-start-pos="1473"><strong data-renderer-mark="true">86400 seconds</strong>&nbsp;</p>
        </div>
      </td>
    </tr>
    <tr>
      <td data-colwidth="271" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <p data-renderer-start-pos="1493">Supports Aggressive Mode</p>
      </td>
      <td colspan="2" data-colwidth="249,236" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <div class="fabric-editor-block-mark fabric-editor-alignment css-1mg5rgz" data-align="center">
          <p data-renderer-start-pos="1521"><strong data-renderer-mark="true">NO</strong></p>
        </div>
      </td>
    </tr>
    <tr>
      <td colspan="3" data-colwidth="271,249,236" data-cell-background="#c8c8c8" style="background-color: rgb(200, 200, 200);">
        <p data-renderer-start-pos="1529">IPSec Parameters</p>
      </td>
    </tr>
    <tr>
      <td data-colwidth="271" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <p data-renderer-start-pos="1551">Mechanism for payload encryption</p>
      </td>
      <td rowspan="1" colspan="2" colorname="White" data-colwidth="249,236" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <div class="fabric-editor-block-mark fabric-editor-alignment css-1mg5rgz" data-align="center">
          <p data-renderer-start-pos="1587"><strong data-renderer-mark="true">ESP</strong></p>
        </div>
      </td>
    </tr>
    <tr>
      <td data-colwidth="271" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <p data-renderer-start-pos="1596">ESP Transform</p>
        <p data-renderer-start-pos="1611">( 3DES/ AES256 )</p>
      </td>
      <td colspan="2" data-colwidth="249,236" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <div class="fabric-editor-block-mark fabric-editor-alignment css-1mg5rgz" data-align="center">
          <p data-renderer-start-pos="1631"><strong data-renderer-mark="true">AES256</strong></p>
        </div>
      </td>
    </tr>
    <tr>
      <td data-colwidth="271" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <p data-renderer-start-pos="1643">Data Integrity</p>
      </td>
      <td colspan="2" data-colwidth="249,236" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <div class="fabric-editor-block-mark fabric-editor-alignment css-1mg5rgz" data-align="center">
          <p data-renderer-start-pos="1661"><strong data-renderer-mark="true">SHA256</strong></p>
        </div>
      </td>
    </tr>
    <tr>
      <td data-colwidth="271" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <p data-renderer-start-pos="1673">Security Association (SA) Lifetime</p>
        <p data-renderer-start-pos="1709">( SHA-1/MD5 )</p>
      </td>
      <td colspan="2" data-colwidth="249,236" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <div class="fabric-editor-block-mark fabric-editor-alignment css-1mg5rgz" data-align="center">
          <p data-renderer-start-pos="1726"><strong data-renderer-mark="true">3600 seconds</strong></p>
        </div>
      </td>
    </tr>
    <tr>
      <td data-colwidth="271" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <p data-renderer-start-pos="1744">Supports Key Exchange for Subnets</p>
      </td>
      <td colspan="2" data-colwidth="249,236" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <div class="fabric-editor-block-mark fabric-editor-alignment css-1mg5rgz" data-align="center">
          <p data-renderer-start-pos="1781"><strong data-renderer-mark="true">YES</strong></p>
        </div>
      </td>
    </tr>
    <tr>
      <td data-colwidth="271" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <p data-renderer-start-pos="1790">Perfect Forward Secrecy ( PFS )</p>
      </td>
      <td colspan="2" data-colwidth="249,236" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <div class="fabric-editor-block-mark fabric-editor-alignment css-1mg5rgz" data-align="center">
          <p data-renderer-start-pos="1825"><strong data-renderer-mark="true">NO</strong></p>
        </div>
      </td>
    </tr>
    <tr>
      <td data-colwidth="271" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <p data-renderer-start-pos="1833">DH-Group for PFS</p>
      </td>
      <td colspan="2" data-colwidth="249,236" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <div class="fabric-editor-block-mark fabric-editor-alignment css-1mg5rgz" data-align="center">
          <p data-renderer-start-pos="1853"><strong data-renderer-mark="true">Group 14</strong></p>
        </div>
      </td>
    </tr>
    <tr>
      <td data-colwidth="271" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <p data-renderer-start-pos="1867">Networks behind VPN</p>
      </td>
      <td data-colwidth="249" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <p data-renderer-start-pos="1890">&nbsp;</p>
      </td>
      <td data-colwidth="236" data-cell-background="#ffffff" style="background-color: rgb(255, 255, 255);">
        <p data-renderer-start-pos="1895">&nbsp;</p>
      </td>
    </tr>
  </tbody>
</table>


All further communication with a requestor is carried out in scope of a ticket.
