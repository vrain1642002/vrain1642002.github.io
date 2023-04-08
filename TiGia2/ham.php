function getExchangeRatesVCB(){
    $Link = $Link2 = '';
    $dir='cache/';
    if(!is_dir($dir)) mkdir($dir,0755,true);
    $Link = $dir.'ExchangeRates.xml';
    $Link2 = 'http://vietcombank.com.vn/ExchangeRates/ExrateXML.aspx';
    $content = @file_get_contents($Link2);
    if($content==''){
      $content = @file_get_contents($Link);
    }else{
      copy($Link2,$Link);
    } 
 
    if($content!='' and preg_match_all('/Exrate CurrencyCode="(.*)" CurrencyName="(.*)" Buy="(.*)" Transfer="(.*)" Sell="(.*)"/',$content,$matches) and count($matches)>0){
      $exchange_rates=array(
      'USD'=>array()
      ,'EUR'=>array()
      ,'GBP'=>array()
      ,'HKD'=>array()
      ,'JPY'=>array()
      ,'CHF'=>array()
      ,'AUD'=>array()
      ,'CAD'=>array()
      ,'SGD'=>array()
      ,'THB'=>array()
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
      Return $exchange_rates;
    }
}