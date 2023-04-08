<html>
  <head>
    <title>php</title>
  </head>

  <body>
  <?php
function getExchangeRatesVCB(){
  $Link = $Link2 = '';
  $dir = 'cache/';
  $Link = $dir.'ExchangeRates.xml';
  $Link2 = 'http://vietcombank.com.vn/ExchangeRates/ExrateXML.aspx';
  $last_updated = '';

  // Check if the cache file is older than 10 minutes
  if (file_exists($Link) && time() - filemtime($Link) < 600) {
    $content = file_get_contents($Link);
    $last_updated = date('Y-m-d H:i:s', filemtime($Link));
  } else {
    // Download and save new data
    $content = file_get_contents($Link2);
    
    $last_updated = date('Y-m-d H:i:s');
   
  }

  if($content!='' and preg_match_all('/Exrate CurrencyCode="(.*)" CurrencyName="(.*)" Buy="(.*)" Transfer="(.*)" Sell="(.*)"/',$content,$matches) and count($matches)>0){
      $exchange_rates=array(
          'AUD'=>array()
          ,'CAD'=>array()
          ,'CHF'=>array()
          ,'CNY'=>array()
          ,'DKK'=>array()
          ,'EUR'=>array()
          ,'GBP'=>array()
          ,'HKD'=>array()
          ,'INR'=>array()
          ,'JPY'=>array()
          ,'KRW'=>array()
          ,'KWD'=>array()
          ,'MYR'=>array()
          ,'NOK'=>array()
          ,'RUB'=>array()
          ,'SAR'=>array()
          ,'SEK'=>array()
          ,'SGD'=>array()
          ,'THB'=>array()
          ,'USD'=>array()
      );

      foreach($matches[1] as $key=>$value){
          if(isset($exchange_rates[$value])){
              $exchange_rates[$value]=array(
                  'id'=>$value
                  ,'name'=>$matches[2][$key]
                  ,'buy'=>$matches[3][$key]
                  ,'transfer'=>$matches[4][$key]
                  ,'sell'=>$matches[5][$key]
              );
          }
      }

      
      return $exchange_rates;
  }
}

?>

<?php
$data=getExchangeRatesVCB();
?>
<h2><center> Bảng tỉ giá hối đoái ngoại tệ</center></h2>
<table border="1" align="center">
    <tr>
        <td>Mã NT</td>
        <td>Tên ngoại tệ</td>
        <td>Mua tiền mặt</td>
        <td>Mua chuyển khoản</td>
        <td>Bán</td>
    </tr>
<?php
foreach($data as $id=>$item){
    ?>
    <tr>
        <td><?php echo $id?></td>
        <td><?php echo $item['name']?></td>
        <td><?php echo $item['buy']?></td>
        <td><?php echo $item['transfer']?></td>
        <td><?php echo $item['sell']?></td>
    </tr>
    <?php
}
?>
</table>

  </body>
</html>