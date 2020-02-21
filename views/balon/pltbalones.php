<?php
  $id_bal = $_GET['id_bal'];
  session_start();
  $balonxuSELECT = $_SESSION['balonxuSELECT'];
?>
<table>
<?php foreach ($balonxuSELECT['DATA'] as $list) { ?>
  <tr>
    <td style="width: 494px">
      <svg id="barcode<?= $list['id_balxu'] ?>"></svg>
    </td>
  </tr>
<?php } ?>
</table>
<?php if (count($balonxuSELECT['DATA']) <= 0) { ?>
  <span>No cuenta con balones actualemnte disponibles</span>
<?php } ?>
<script src="../../plugins/jquery/jquery.min.js"></script>
<script src="../../dist/js/JsBarcode.all.min.js"></script>
<script src="../../javascript/balon.js"></script>
<script>
  fetch('../../controllers/balonController.php?op=17&id_bal=<?= $id_bal ?>')
  .then(res => res.json())
  .then(info => {
    if (info.STATUS == 'OK') {
      for(var i in info.DATA) {
        obtenerbarcodeList(`${info.DATA[i].codbar_balxu}`,info.DATA[i].id_balxu)
      }
    }
  })
</script>
