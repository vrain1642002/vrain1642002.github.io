
<html>
  <head>
    <title>php</title>
  </head>

  <body>
  <?php
$data=getExchangeRatesVCB();
?>
<table border="1">
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