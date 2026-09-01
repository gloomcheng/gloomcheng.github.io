---
title: "[Drupal] 在客製表單中加入上載檔案/圖像的欄位"
description: "平時甚少會需要在客製表單中加入檔案/圖像上傳的檔案，所以一時之間也不知道該怎麼寫，為了避免下次又忘記，來補篇筆記 Drupal 8 開始是定義在 ManagedFile Class[^1] 內： php $form['images'] = array( '#type' => 'managedfile', '#uploadlocation' => 'priva"
publishedAt: "2022-05-27T12:46:54.000Z"
updatedAt: "2022-07-11T01:10:35.000Z"
legacyPath: "/technical/drupal-zai-ke-zhi-biao-dan-zhong-jia-ru-shang-zai-dang-tu-xiang-de-lan-wei"
kind: "technical"
tags: ["Drupal 8+", "Form API", "Module development"]
legacyNid: 183
archived: true
---

平時甚少會需要在客製表單中加入檔案/圖像上傳的檔案，所以一時之間也不知道該怎麼寫，為了避免下次又忘記，來補篇筆記

Drupal 8 開始是定義在 ManagedFile Class[^1] 內：
```php
$form['images'] = array(
  '#type' => 'managed_file',
  '#upload_location' => 'private://images/',
  '#multiple' => TRUE,
  '#upload_validators' => array(
    'file_validate_extensions' => array('png gif jpg jpeg'),
    'file_validate_size' => array(25600000),
    'file_validate_image_resolution' => array('800x600', '400x300'),
  ),
);
```

其中，Drupal 預設就提供數種 `upload_validators`[^2]，如
- [file_validate_extensions](https://api.drupal.org/api/drupal/core%21modules%21file%21file.module/function/file_validate_extensions/10.0.x): 驗證檔案的副檔名（檔案類型）
- [file_validate_image_resolution](https://api.drupal.org/api/drupal/core%21modules%21file%21file.module/function/file_validate_image_resolution/10.0.x): 驗證圖像檔案的解析度
- [file_validate_is_image](https://api.drupal.org/api/drupal/core%21modules%21file%21file.module/function/file_validate_is_image/10.0.x): 驗證檔案是否為影像類型
- [file_validate_name_length](https://api.drupal.org/api/drupal/core%21modules%21file%21file.module/function/file_validate_name_length/10.0.x): 驗證檔名長度
- [file_validate_size](https://api.drupal.org/api/drupal/core%21modules%21file%21file.module/function/file_validate_size/10.0.x): 驗證檔案大小

至於如果要使用 `default_value` 來判斷之前是否有值，主要就是要先能取得之前上傳檔案的 fid，然後在 `default_value` 填入 fid 值，如下：

```php
$form['picture'] = array(
      '#title' => t('picture'),
      '#description' => $this->t('Chossir Image gif png jpg jpeg'),
      '#type' => 'managed_file',
      '#required' => true,
      '#default_value' => (isset($data['fid'])) ? [$data['fid']] : [],
      '#upload_location' => 'public://images/',
      '#upload_validators' => array(
        'file_validate_extensions' => array('gif png jpg jpeg')),
    );
```
Ref: https://codimth.com/blog/web/drupal/how-set-default-value-managed-file-field-drupal-8-9

[^1]: https://api.drupal.org/api/drupal/core%21modules%21file%21src%21Element%21ManagedFile.php/class/ManagedFile/8.2.x
[^2]: https://api.drupal.org/api/drupal/core%21modules%21file%21file.module/10.0.x
