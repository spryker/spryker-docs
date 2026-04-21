---
title: Federated Authentication via OAuth2/OIDC
description: Learn how Spryker Federated Authentication lets your customers, back-office users, and merchant users log in through an external Identity Provider using OAuth2 and OpenID Connect.
template: concept-topic-template
last_updated: Apr 21, 2026
---

If your enterprise customers, back-office operators, or merchant users already authenticate through a corporate Identity Provider — Keycloak, Azure AD, Okta, or any other OAuth2/OIDC-compatible system — this feature lets them bring that identity to Spryker. Instead of maintaining a separate set of credentials for every application, your users log in through the same IdP they already trust, and Spryker handles the rest.

This is built on [KnpU OAuth2 Client Bundle](https://github.com/knpuniversity/oauth2-client-bundle), which wraps [league/oauth2-client](https://oauth2-client.thephpleague.com/) and provides Symfony-integrated OAuth2 clients for a broad range of providers. Your project does not need to implement the OAuth protocol — you configure a provider, wire the plugins, and the flow is handled for you.

---

## What You Get

Federated authentication works across all three Spryker applications out of the box:

| Application | User Type | Multiple Providers |
|---|---|---|
| Storefront (Yves) | Customer | Yes — one login button per provider |
| Back-office (Zed) | Back-office user | Single provider |
| Merchant Portal | Merchant user | Yes — one login button per provider |

On the Storefront and Merchant Portal, you can connect as many providers as you need — your users will see a separate login button for each one. The Back-office currently supports a single provider; support for multiple providers there is coming in a later version.

Authentication via the Platform API (Glue) is also coming in a later version.

---

## How the OAuth2 Authorization Code Flow Works

Spryker uses the [OAuth 2.0 Authorization Code flow](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1) as defined in RFC 6749. For OIDC-compatible providers like Keycloak, Azure AD, and Okta, the ID token is also issued alongside the access token per the [OpenID Connect Core 1.0 specification](https://openid.net/specs/openid-connect-core-1_0.html).

The sequence below shows the full flow from the moment a user clicks a login button to the moment their session is created.

[![](https://mermaid.ink/img/pako:eNqFVd1u4kYUfpUjVylE9RJiMGws7a4C2W0Rmw1ah71oqdDEPpgRtoeOxwQWWepVH6DqE-6T9MzYJATYlgtjz5y_7zvfnNlagQjR8qyzsy1PufJgW1NzTLDmQS3EGctjVbOhXPvCJGcPMWY1bZZglrEI73Gt-iIWUnv80DQ_7ZHxKGXx0U5RFGdnkzTDP3JMA7zhLJIsmaRAPxYoIWEMLINxhrJcXDKpeMCXLFXQ01s9KR5P7vp611_KzeLU7lDvDtPlGO6uczV3oB9zTNWx4UAbDkLa42oDIylWPNQBS0uJgQIZPdQdp2mD03Lp4brn5ab-fRIKQayQgNi-BwMilTPFRfpsMn719m3P0wUEC5hYH0XEU3jkag6-fzexng17ZEgxfn5_DxeCUdUXvAyHF9vAlP-JJVg8O_iVA6YoyQoyRU9qlvkfSZzxdTHdSpaGIvkF1weeQ4_ghVxDrGeBWGJmlxH24A1LO586hTDL47i0gBWLcwTCkZEsXqAdvirhtpoOfPvrb6J2BBqLkPyrIQbGnz-W5piGxzy7muJ2ix5O8yTPPXvgmai6r7ptwQHfmsZBReMuM74rCZzy8E2j0fjRoDBvOwqmueR64WXfKM5eGoR6QPb6i8XE1u2HaxtQBY29QgcH-AMWxw8sWLzTJ-_NVj-LKn3Zp-I_yDCiM4y03O-QQd3pVymAGg33YoEpvF8Hc5ZGeFJc211NI6bmxf8Vtie0W6aCeaWApZGXgcgNI7MNre1Oz4HOIlTXQUBSMdXVf9PJfj-W2RcW8_BJyMAixtNM7TQGdVzTzIBEV3HgTH0a3fnUcGXgf_vzH8CKAtDJYEajhpkSwJgcNIySl7vTMkD9J0JVvWvXu8FN_wledn4gd6JmD95L9Dsl5jTEeDoTprYZaiIlZiKXAbXykQ4wBDHjSXZQmK8Hh14n9AnjsQ0RX2E6TWkS2DBjCY831QeJ9_yoZTc8C5gMT2A_Kbi2aw7e96ecb5O2P1PhcW4Os5acfzgDqtzGbEWOhE2i7mg1rqGctkcOI-KWU8PNyK5kRUOZyhMy3LeuJmoZdCcPLcXdaSagwJbL-MVwIMSWbUWSh5anZI62laAkUunT2mqTiWUuvonl0WvI5EJP54J86Kb4VYhk5yZFHs0tb0ZDgL7ypdZsdbU9rUrKhrIv8lRZntO5MkEsb2utLe_SbTdeO47jdi7dbvuqedmxrQ0td143Wq2O23W63Su3fel0Ctv6avI2G91Ot9lutbuXZNHqtLu2RVBpLN-WF7q514t_AYE-crU?type=png)](https://mermaid.live/edit#pako:eNqFVd1u4kYUfpUjVylE9RJiMGws7a4C2W0Rmw1ah71oqdDEPpgRtoeOxwQWWepVH6DqE-6T9MzYJATYlgtjz5y_7zvfnNlagQjR8qyzsy1PufJgW1NzTLDmQS3EGctjVbOhXPvCJGcPMWY1bZZglrEI73Gt-iIWUnv80DQ_7ZHxKGXx0U5RFGdnkzTDP3JMA7zhLJIsmaRAPxYoIWEMLINxhrJcXDKpeMCXLFXQ01s9KR5P7vp611_KzeLU7lDvDtPlGO6uczV3oB9zTNWx4UAbDkLa42oDIylWPNQBS0uJgQIZPdQdp2mD03Lp4brn5ab-fRIKQayQgNi-BwMilTPFRfpsMn719m3P0wUEC5hYH0XEU3jkag6-fzexng17ZEgxfn5_DxeCUdUXvAyHF9vAlP-JJVg8O_iVA6YoyQoyRU9qlvkfSZzxdTHdSpaGIvkF1weeQ4_ghVxDrGeBWGJmlxH24A1LO586hTDL47i0gBWLcwTCkZEsXqAdvirhtpoOfPvrb6J2BBqLkPyrIQbGnz-W5piGxzy7muJ2ix5O8yTPPXvgmai6r7ptwQHfmsZBReMuM74rCZzy8E2j0fjRoDBvOwqmueR64WXfKM5eGoR6QPb6i8XE1u2HaxtQBY29QgcH-AMWxw8sWLzTJ-_NVj-LKn3Zp-I_yDCiM4y03O-QQd3pVymAGg33YoEpvF8Hc5ZGeFJc211NI6bmxf8Vtie0W6aCeaWApZGXgcgNI7MNre1Oz4HOIlTXQUBSMdXVf9PJfj-W2RcW8_BJyMAixtNM7TQGdVzTzIBEV3HgTH0a3fnUcGXgf_vzH8CKAtDJYEajhpkSwJgcNIySl7vTMkD9J0JVvWvXu8FN_wledn4gd6JmD95L9Dsl5jTEeDoTprYZaiIlZiKXAbXykQ4wBDHjSXZQmK8Hh14n9AnjsQ0RX2E6TWkS2DBjCY831QeJ9_yoZTc8C5gMT2A_Kbi2aw7e96ecb5O2P1PhcW4Os5acfzgDqtzGbEWOhE2i7mg1rqGctkcOI-KWU8PNyK5kRUOZyhMy3LeuJmoZdCcPLcXdaSagwJbL-MVwIMSWbUWSh5anZI62laAkUunT2mqTiWUuvonl0WvI5EJP54J86Kb4VYhk5yZFHs0tb0ZDgL7ypdZsdbU9rUrKhrIv8lRZntO5MkEsb2utLe_SbTdeO47jdi7dbvuqedmxrQ0td143Wq2O23W63Su3fel0Ctv6avI2G91Ot9lutbuXZNHqtLu2RVBpLN-WF7q514t_AYE-crU)

The only claim your IdP must return is **`email`**. If the IdP also returns `given_name`, `family_name`, `name`, or `preferred_username`, Spryker uses them to populate display fields where available. If you need additional claims for custom logic — roles, groups, department — you can request them by configuring the appropriate scopes on the provider.

---

## How It Fits Into Spryker's Architecture

### Bridging Two Worlds

Spryker runs as a Symfony application but maintains its own dependency injection container alongside Symfony's. KnpU registers its `ClientRegistry` in the Symfony container, but Spryker's business and communication layers expect their dependencies in Spryker's own container.

`OauthKnpuApplicationPlugin` resolves this on application boot. It pulls `ClientRegistry` out of the Symfony container and re-exposes it in Spryker's DI, so that Spryker's plugin chain can reach it. It also registers the OAuth callback routes into Symfony's router — which is necessary because KnpU uses Symfony's router to build redirect URIs, while Spryker's own router is separate.

[![](https://mermaid.ink/img/pako:eNqdld1umzAUx1_Fcm9WCVI-wke4mBQITFWXNYL2YhvT5IKToBAbGSM1q_oQe4Pt1fYks4GkSdpMXeEmds7v_I__PjYPMKM5hh5cMFQtwc0kJUA8dXPXTSSfp19TmGzWc0o2IKCEo4JglsJvXaB8rnwRckWqW3A9bvjSCMoCE-43JC_xQWAQi8Du3xgvipqzTZqSdytSNQOKJDpg_fz5kQJQ1feC76YwyVNyVOjs4-2Hy08i_7VMJKppxlVVFhniBSWzslkURGqxhtSAEnBHKVdAhZnIwOYow4eCvqz0z89fIMYqvq9ojcGzugsCkoptViLH5PKAjjv6N-iiRUCGyvIOZSvAaMNx3dO9q7Gce7J0b3VB3K7bj58tN5lJjRP6SWt06-gga8v-zvb8PlzJ-UvCfiecBM-V4-vbmzDZa4q-fJH4aJXC5_JoI2NdgBclFbtx0danbhnJJ5wyPGeiyY4oQ1I1zhpW8I3agU2NWZdJor5IodL5vDjeydg8YNeYZUtEuFpRxlGpLpqiL2SXatqHgFkb8qI_cedPrB8OjcOhuTOPb0oszxKYF2XpnUVmaEWWIuynK-yduaExHI-VjJaUeWeapu1Tovd7yA2DyH0dJBrn_6HuCPVgaEZGNNmBeui6oXUC9LdqoR9ZUfQ6KH4LJNp-S01CJ7J3lBWalq-fop7sMMNwT-ufVNfoW9CK9nfMseR7CtS30Fi-O2gUyvcUZLwFMl8JQUVc8EUOPc4arEBxCtZIDuGDTJdCvsRrcVd74meO2CqFKXkUTIXIF0rXW0wc68USenNU1mLUVDnieFIgcS-sd7NMnBLMAtoQDj3Httsk0HuA99AzbGswsi3T1W3TthxnNFTgRkYNXNOydXfouMOhoxmPCvzRymoDxx0ZmqMNdcM2LVczFYjzQlwT0-6r1X68Hv8Ca10ZKg?type=png)](https://mermaid.live/edit#pako:eNqdld1umzAUx1_Fcm9WCVI-wke4mBQITFWXNYL2YhvT5IKToBAbGSM1q_oQe4Pt1fYks4GkSdpMXeEmds7v_I__PjYPMKM5hh5cMFQtwc0kJUA8dXPXTSSfp19TmGzWc0o2IKCEo4JglsJvXaB8rnwRckWqW3A9bvjSCMoCE-43JC_xQWAQi8Du3xgvipqzTZqSdytSNQOKJDpg_fz5kQJQ1feC76YwyVNyVOjs4-2Hy08i_7VMJKppxlVVFhniBSWzslkURGqxhtSAEnBHKVdAhZnIwOYow4eCvqz0z89fIMYqvq9ojcGzugsCkoptViLH5PKAjjv6N-iiRUCGyvIOZSvAaMNx3dO9q7Gce7J0b3VB3K7bj58tN5lJjRP6SWt06-gga8v-zvb8PlzJ-UvCfiecBM-V4-vbmzDZa4q-fJH4aJXC5_JoI2NdgBclFbtx0danbhnJJ5wyPGeiyY4oQ1I1zhpW8I3agU2NWZdJor5IodL5vDjeydg8YNeYZUtEuFpRxlGpLpqiL2SXatqHgFkb8qI_cedPrB8OjcOhuTOPb0oszxKYF2XpnUVmaEWWIuynK-yduaExHI-VjJaUeWeapu1Tovd7yA2DyH0dJBrn_6HuCPVgaEZGNNmBeui6oXUC9LdqoR9ZUfQ6KH4LJNp-S01CJ7J3lBWalq-fop7sMMNwT-ufVNfoW9CK9nfMseR7CtS30Fi-O2gUyvcUZLwFMl8JQUVc8EUOPc4arEBxCtZIDuGDTJdCvsRrcVd74meO2CqFKXkUTIXIF0rXW0wc68USenNU1mLUVDnieFIgcS-sd7NMnBLMAtoQDj3Httsk0HuA99AzbGswsi3T1W3TthxnNFTgRkYNXNOydXfouMOhoxmPCvzRymoDxx0ZmqMNdcM2LVczFYjzQlwT0-6r1X68Hv8Ca10ZKg)

The Yves plugin handles the Storefront callback route. The Zed plugin handles both Back-office and Merchant Portal, since both run within the same Zed container.

---

### Symfony Security Integration

Once the bridge is in place, `SecurityOauthKnpu` plugs into Symfony Security the same way in every application: a dedicated OAuth authenticator is added to the existing firewall, sitting alongside the standard form-login authenticator so that both login methods continue to work independently.

[![](https://mermaid.ink/img/pako:eNqVlt1u4kYUx19lNHuzKxFq_IGNVVXy12SjLAsKEInWVTSxB2JhPGiw2zrZSL3aB1j1XXrfR9kn6RkbO7CQLTUX2MP5nfM_Z84Z_IQjHjNs46Wgmwc0dcMMwbUt7uuFK3_8S4ivYpblSV6iseC_JTET6O01K6OU0xX652_kPBaCIceX96NVTuV3t9t9F-Jfa3csi8PsG8_XH8czcD1yivxBlY5zHvEUfaAlEy0orw-BczkLwDRldFmwHziVxEWUJiDqwFK6vPNcML3ONjNUu_YqO7fI4pSFYVY_3rBlss1FeQpHFxc_7YIeqa-X0Y9g8inE76fT8QR9_fMvJCVxkTwymXrOVyyTN8WWiSRb8BB_koU8KoF7c-VfysxGkgfNhbPZpElE84Rn47RYJhl6ey-SeMneHSh1_WDiAXeYDPr6-QuabES5gg3yryDZiKbpPY1WSPAiZ9vaoFwveFaiG7kkTm3Rfh1qiUfKJ_MhGX2c300CKaNxOWFRIaBNDrS-ZDsC0xmUBC0SwX4HaVXpXNB3wReLJGIHnLyc2fT9XcVVFZLwVBZXbqzsSKgUF5AnjWMWo_sXBa35gcsqxyNdQ9nhQyaiB5rlx_qaX9CYi5ympzVWPqqgjXltfZ7aQ-aySM5QPb-FiFvpAHwdCJ5AFLYQ_JvhaLVWZKXVK7Y5X_9XTRurMV2y08L2eqful6p1dpt3en04Pr0-v217LS9TJscGsktT-w0hRAuUDjQ6qIVH1_IUpQNHBhf2G0VR9inZwQ2mBQYxWswKVN1xXsF2070DrcAj1nlgMzH_n9zlX4OBRlTit2AvsKzAeA2UR0DDucQg5Dxub3IbuQbZr5BpyM9rUUdNSIsYwaCFdM1RdPMVaNcITbgecYh6HjlsNj9QiEmcFlIUa2C63wv3QvoQ7kxyftto9AI98FrIt3puX_leuBcyIMpeMY9I3IF_2iTGdi4K1sEwVmsqH_GT9BlimME1TJkNtzEVqxCH2TMwG5r9zPm6weA4Xz5ge0HTLTwVm5jmzE8onAzrdlXAVDLh8SLLsW0qWuUE20_4D2yrptG1NL2va7qqaaZldXCJbUvv9nVLG6gDra-og37vuYMfq6hK1zR0VemrutIzzZ6hGx3M4gQOimH99lC9RDz_C8URmXU?type=png)](https://mermaid.live/edit#pako:eNqVlt1u4kYUx19lNHuzKxFq_IGNVVXy12SjLAsKEInWVTSxB2JhPGiw2zrZSL3aB1j1XXrfR9kn6RkbO7CQLTUX2MP5nfM_Z84Z_IQjHjNs46Wgmwc0dcMMwbUt7uuFK3_8S4ivYpblSV6iseC_JTET6O01K6OU0xX652_kPBaCIceX96NVTuV3t9t9F-Jfa3csi8PsG8_XH8czcD1yivxBlY5zHvEUfaAlEy0orw-BczkLwDRldFmwHziVxEWUJiDqwFK6vPNcML3ONjNUu_YqO7fI4pSFYVY_3rBlss1FeQpHFxc_7YIeqa-X0Y9g8inE76fT8QR9_fMvJCVxkTwymXrOVyyTN8WWiSRb8BB_koU8KoF7c-VfysxGkgfNhbPZpElE84Rn47RYJhl6ey-SeMneHSh1_WDiAXeYDPr6-QuabES5gg3yryDZiKbpPY1WSPAiZ9vaoFwveFaiG7kkTm3Rfh1qiUfKJ_MhGX2c300CKaNxOWFRIaBNDrS-ZDsC0xmUBC0SwX4HaVXpXNB3wReLJGIHnLyc2fT9XcVVFZLwVBZXbqzsSKgUF5AnjWMWo_sXBa35gcsqxyNdQ9nhQyaiB5rlx_qaX9CYi5ympzVWPqqgjXltfZ7aQ-aySM5QPb-FiFvpAHwdCJ5AFLYQ_JvhaLVWZKXVK7Y5X_9XTRurMV2y08L2eqful6p1dpt3en04Pr0-v217LS9TJscGsktT-w0hRAuUDjQ6qIVH1_IUpQNHBhf2G0VR9inZwQ2mBQYxWswKVN1xXsF2070DrcAj1nlgMzH_n9zlX4OBRlTit2AvsKzAeA2UR0DDucQg5Dxub3IbuQbZr5BpyM9rUUdNSIsYwaCFdM1RdPMVaNcITbgecYh6HjlsNj9QiEmcFlIUa2C63wv3QvoQ7kxyftto9AI98FrIt3puX_leuBcyIMpeMY9I3IF_2iTGdi4K1sEwVmsqH_GT9BlimME1TJkNtzEVqxCH2TMwG5r9zPm6weA4Xz5ge0HTLTwVm5jmzE8onAzrdlXAVDLh8SLLsW0qWuUE20_4D2yrptG1NL2va7qqaaZldXCJbUvv9nVLG6gDra-og37vuYMfq6hK1zR0VemrutIzzZ6hGx3M4gQOimH99lC9RDz_C8URmXU)

---

### The Plugin Chain

Each application follows the same four-stage plugin chain. This is where you connect the OAuth flow to Spryker's user resolution and persistence logic.

`SecurityOauthKnpu` ships with a concrete implementation of each plugin for every application. You register them in the respective dependency providers during integration — no custom plugin code required unless you want to override a step.

| Stage | Storefront | Back-office | Merchant Portal |
|---|---|---|---|
| **AuthenticationLink**<br>Renders login buttons on the login page | `KnpuCustomerAuthenticationLinkPlugin` | `KnpuOauthAuthenticationLinkPlugin` | `KnpuOauthMerchantUserAuthenticationLinkPlugin` |
| **ClientStrategy**<br>Exchanges the OAuth code for a resource owner | `KnpuOauthCustomerClientStrategyPlugin` | `KnpuOauthUserClientStrategyPlugin` | `KnpuOauthMerchantUserClientStrategyPlugin` |
| **IdentityStrategy**<br>Resolves the Spryker entity from the resource owner | `KnpuOauthCustomerIdentityStrategyPlugin` | `KnpuOauthUserIdentityStrategyPlugin` | `KnpuOauthMerchantUserIdentityStrategyPlugin` |
| **IdentityPersistence**<br>Creates or updates the OAuth identity record | `KnpuOauthCustomerIdentityPersistencePlugin` | `KnpuOauthUserIdentityPersistencePlugin` | `KnpuOauthMerchantUserIdentityPersistencePlugin` |

---

### How Identities Are Stored

Spryker keeps a lightweight identity record for each user–provider pair. This is what makes the connection between a Spryker account and an external IdP identity persistent across sessions.

[![](https://mermaid.ink/img/pako:eNq9VMtugzAQ_BVrzySihvDwtVUvVaWeK6TIit1gATYydpSU5N9rkzYJauDW-oR3Zmd37MU9bBTjQIDrJ0G3mjaFRG517WG9sZ1RDdfoeFwsVD_EFLWmXFeytRd4LRiXRpgDIqiAWsiKM7QTFH1UF04BV1nbTUp6aE7O47dSTnlTUmnmNEecOfER0Ve51pl13Z95fglpkGDz9LeXMf_mlNDzDbajvh2NWq12Lln_RvjecC1p7bTvgA0V9Tl8mrAyPpBZG2PqHQvDBfxv-xMXO-tjIueOofFo_ZEzCGCrBQNitOUBuJoOdFsYTBRgSt7wAvysMqorP5Q-p6XyXanmJ00ruy2BfNC6czvbMmr49898iWouXauPykoDJMnzQQRID3sgOF0tsyhO4ijGUZRmWQAHIFm8TOIsynEeJSHOk4dTAJ9D1XCZrmIcJhinufsK0wA4E0bp1_NTMrwopy-7hXdo?type=png)](https://mermaid.live/edit#pako:eNq9VMtugzAQ_BVrzySihvDwtVUvVaWeK6TIit1gATYydpSU5N9rkzYJauDW-oR3Zmd37MU9bBTjQIDrJ0G3mjaFRG517WG9sZ1RDdfoeFwsVD_EFLWmXFeytRd4LRiXRpgDIqiAWsiKM7QTFH1UF04BV1nbTUp6aE7O47dSTnlTUmnmNEecOfER0Ve51pl13Z95fglpkGDz9LeXMf_mlNDzDbajvh2NWq12Lln_RvjecC1p7bTvgA0V9Tl8mrAyPpBZG2PqHQvDBfxv-xMXO-tjIueOofFo_ZEzCGCrBQNitOUBuJoOdFsYTBRgSt7wAvysMqorP5Q-p6XyXanmJ00ruy2BfNC6czvbMmr49898iWouXauPykoDJMnzQQRID3sgOF0tsyhO4ijGUZRmWQAHIFm8TOIsynEeJSHOk4dTAJ9D1XCZrmIcJhinufsK0wA4E0bp1_NTMrwopy-7hXdo)

The anchor for each record is the combination of `provider` and `external_id` — the stable, IdP-assigned identifier for that user. This matters in practice: if your users change their email address in the IdP, their Spryker account remains correctly linked and login continues to work. The `email` column in the identity table is updated to the latest IdP value on every successful login, but the email stored on the Spryker entity itself (`spy_customer.email`, `spy_user.email`) is left untouched. Syncing that back is something you can implement at the project level if your use case requires it.

---

## How Login Works

The resolution logic is the same across all three applications. Spryker first looks for an existing identity record; if it finds one, the user is logged in immediately. If not — because this is the first time they are logging in via this provider — Spryker falls back to email matching.

[![](https://mermaid.ink/img/pako:eNrllltvmzAUx7-K5b5sGq28AOHysIkQaFN1F3V92SCaKJwkVgxGtsmaRfnuM5eibNrDXpfaQuLgc_n_OBKcA855AdjHK8Z_5JtMKPQwTyukV_Aq-RQ0aoPyjLHHLN8iATnQHRTL1-jy8h2aJXecb1FTI1pApajatx5cFGlaPe5RLfhOHwj0BsGTAlFl7Dstln3yWZchPNx3AWjFm6p4f-zPQn2GvoLsXK6Te1CNqBCj1RYK1Bdannh-5J3jfFQzaNESoMwo02pWgpdoUXxGOctoKYfoeRcXHaLe_zcN0amGOLnTxX2UC8gU_Em7PIkYtNwuHhJ99a9AUl7Raq1lSAD0CPpFDyFxT9gbrX9XrDevO-MmiZ4gb3TRmkt1KUByttMGa9a0kjplU0vQPfu7pJsuxyIJe91farHf6n5IkK0m7aTdpNozQAFaUcb8i3kYuXFsSCX4FvyLt5HrRraRc8aFf0EIQf_xGmFnLwk2HGBju90jrGO3-9xg58-wcWxGZISNZ25IyLnBRi-ps_EAG5HYiYMRlhDXc2bnBtv-CobemtFpb91oYgXBWeCOsNfPnXVjO_JGVMsMiOWcW2dvXhLs4h9hsYHXghbYV6IBA5cg9NimTXxox5gUqw2UkGJf3xaZ2KY4rY46ps6qb5yXz2GCN-sN9lcZk9pq6kKPPHOarUVWjk8FVHogDfWgp7A_nU67JNg_4CfsT1zzyjadqe3a-qNCHM828B77zuTKMi1r6jn2dGJZln008M-uLLlyTW8ysYhJTMfyPNsxMBRUcfGhH6m7yfr4C8XmTiw?type=png)](https://mermaid.live/edit#pako:eNrllltvmzAUx7-K5b5sGq28AOHysIkQaFN1F3V92SCaKJwkVgxGtsmaRfnuM5eibNrDXpfaQuLgc_n_OBKcA855AdjHK8Z_5JtMKPQwTyukV_Aq-RQ0aoPyjLHHLN8iATnQHRTL1-jy8h2aJXecb1FTI1pApajatx5cFGlaPe5RLfhOHwj0BsGTAlFl7Dstln3yWZchPNx3AWjFm6p4f-zPQn2GvoLsXK6Te1CNqBCj1RYK1Bdannh-5J3jfFQzaNESoMwo02pWgpdoUXxGOctoKYfoeRcXHaLe_zcN0amGOLnTxX2UC8gU_Em7PIkYtNwuHhJ99a9AUl7Raq1lSAD0CPpFDyFxT9gbrX9XrDevO-MmiZ4gb3TRmkt1KUByttMGa9a0kjplU0vQPfu7pJsuxyIJe91farHf6n5IkK0m7aTdpNozQAFaUcb8i3kYuXFsSCX4FvyLt5HrRraRc8aFf0EIQf_xGmFnLwk2HGBju90jrGO3-9xg58-wcWxGZISNZ25IyLnBRi-ps_EAG5HYiYMRlhDXc2bnBtv-CobemtFpb91oYgXBWeCOsNfPnXVjO_JGVMsMiOWcW2dvXhLs4h9hsYHXghbYV6IBA5cg9NimTXxox5gUqw2UkGJf3xaZ2KY4rY46ps6qb5yXz2GCN-sN9lcZk9pq6kKPPHOarUVWjk8FVHogDfWgp7A_nU67JNg_4CfsT1zzyjadqe3a-qNCHM828B77zuTKMi1r6jn2dGJZln008M-uLLlyTW8ysYhJTMfyPNsxMBRUcfGhH6m7yfr4C8XmTiw)

### First Time a User Logs In via SSO

On the first OAuth login, there is no identity record yet. Spryker looks up the entity by the email address returned by the IdP:

- If an account with that email already exists in Spryker — perhaps the user registered through the regular form previously — it gets linked to the OAuth identity on the spot. From this point on, the user can log in via SSO or, if you keep it enabled, via password.
- If no account exists, just-in-time provisioning runs (see below).

Either way, the identity record is created at the end of this first login and used for every login after.

### Every Login After That

Once the identity record exists, Spryker goes straight to it using the provider name and the external ID. Your users' email addresses are no longer part of the lookup — so even if someone updates their email in the IdP, the connection to their Spryker account is unaffected.

---

## Just-in-Time Provisioning

### Storefront

When a customer logs in via SSO for the first time and no Spryker account with their email exists, one is created automatically. The account is confirmed immediately — no email verification is sent. Name fields are populated from IdP claims where available.

This default behaviour is intentionally minimal, and you are expected to extend it to fit your project. Two common starting points:

- **Accept-only mode**: If you want only pre-existing customers to be able to log in via SSO — for example, because you import customers from a CRM — you can disable automatic creation by replacing `CreateCustomerOauthCustomerAuthenticationStrategyPlugin` with `AcceptOnlyOauthCustomerAuthenticationStrategyPlugin` in your `CustomerDependencyProvider`.
- **B2B provisioning**: In a B2B context, a new customer often needs to be assigned to a company and given a company user record before they can do anything meaningful. You can extend the creation strategy to handle this automatically based on claims from your IdP.

### Back-office

Back-office users are provisioned automatically on first SSO login if no user with their email exists. This is built into the `SecurityOauthUser` module via `CreateUserAuthenticationStrategy` and works without any configuration on your part.

### Merchant Portal

Merchant users are not provisioned automatically. The merchant user must already exist in Spryker before they can log in via SSO. This is intentional — without project-specific logic, Spryker has no way to know which merchant a newly arrived user should belong to. If your project needs JIT provisioning here, you can implement a custom authentication strategy that makes that merchant assignment decision and creates the user accordingly.

---

## Security Considerations

### How CSRF Is Prevented

When a user initiates an OAuth login, Spryker generates a state value made up of a provider-specific prefix and a cryptographically random hex string — something like `sso_yves_a3f9b2c1...`. The KnpU bundle stores this full value in the user's session before redirecting to the IdP.

When the IdP redirects back, KnpU compares the returned `state` parameter against the stored session value. The match must be exact — any deviation causes the request to be rejected before the authorization code is exchanged. This protects against CSRF attacks on the callback endpoint.

The prefix part of the state is just a routing signal — Spryker uses it to identify which provider's KnpU client should handle the callback. It does not need to be secret, but it must be unique per provider in a given application.

### What Happens to the Access Token

The OAuth access token is used for one thing: fetching the user's claims from the IdP's userinfo endpoint. Once Spryker has those claims, the token is discarded. It is never written to the database, the session, or any log.

The practical implication is that **your Spryker session is independent of the IdP token**. If a user's account is suspended in the IdP after they have already logged into Spryker, their active session continues until it expires according to Spryker's standard session configuration. Continuous session validation against the IdP — and federated logout — are coming in a later version.

---

## Supported Providers

You can use any OAuth2/OIDC provider that `knpuniversity/oauth2-client-bundle` supports. The reference configuration in this codebase uses Keycloak, but the architecture is provider-agnostic. For the full list of supported provider types and their specific configuration fields, see the [KnpU OAuth2 Client Bundle provider documentation](https://github.com/knpuniversity/oauth2-client-bundle#supported-grant-types--oauth2-providers).

---

## Coming in Later Versions

| Capability | Description |
|---|---|
| Platform API (Glue) OAuth | SSO for API consumers via token exchange |
| Multi-provider Back-office | Multiple IdP options on the Back-office login page |
| Continuous sessions | Using IdP refresh tokens to extend Spryker sessions |
| Attribute sync | Keeping Spryker entity data in sync with IdP claims on each login |
| Claims-to-roles mapping | Assigning Spryker ACL roles automatically based on IdP group claims |

