---
title: HowTo - Adding a New Tag for Comment
originalLink: https://documentation.spryker.com/v3/docs/ht-adding-new-tag-for-comment
redirect_from:
  - /v3/docs/ht-adding-new-tag-for-comment
  - /v3/docs/en/ht-adding-new-tag-for-comment
---

Tags are keywords associated with the comments. With their help, you can quickly find the necessary information discussed in the cart [comments](https://documentation.spryker.com/v3/docs/comments-201907). 
To add the available tags for comments:

* Introduce the config file - `CommentConfig`:
<details open>
<summary>Pyz\Shared\Comment\CommentConfig.php</summary>
 
```php
namespace Pyz\Shared\Comment;
 
use Spryker\Shared\Comment\CommentConfig as SprykerCommentConfig;
 
class CommentConfig extends SprykerCommentConfig
{
    /**
     * @return string[]
     */
    public function getAvailableCommentTags(): array
    {
        return [
            'delivery',
            'important',
        ];
    }
}
```
</details> 

You can create your own tag by entering its name under "delivery" and "important" elements.

* Add translations for the tags to the `glossary.csv`
<details open>
<summary>data/import/glossary.csv:</summary>

```yaml
comment_widget.tags.delivery,Delivery,en_US
comment_widget.tags.delivery,Lieferung,de_DE
comment_widget.tags.important,Important,en_US
comment_widget.tags.important,Wichtig,de_DE
```
<br>
</details>



