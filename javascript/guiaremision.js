function productoRow() {
	$('#divId_bal').css('display','');
}
function productoSelect(id_bal) {
	var count = 0;
	$('#tblBalones > .trBalones').each(function(){
		count++;
	});
	__ajax('../controllers/ventasController.php?op=2','POST','JSON',{'id_bal' : id_bal})
	.done(function(info) {
		if (info.STATUS == 'OK') {
			$('#divBalones').css('display','');
			$('#divId_bal').css('display','none');
			$('#sltId_bal > ').remove();
			var row = `
				<tr class="trBalones trBalones${count+1}">
					<td colspan="3">
						<span>${info.DATA[0].nombre_bal}</span>
						<button type="button" onclick="borrarlineaPS(${count+1})" class="btn btn-danger">Quitar</button>
					</td>
				</tr>
				<tr class="trBalones${count+1}">
					<td colspan="1">
						<input id="cantidad_balgui${count+1}" name="cantidad_balgui${count+1}" class="cantidad_balgui form-control" type="number" min="1" max="${info.DATA[0].cantidad_bal}" placeholder="Cantidad" required>
					</td>
					<td colspan="2">
						<input id="detalle_balgui${count+1}" name="detalle_balgui${count+1}" class="detalle_balgui form-control" type="text" placeholder="Detalle adicional" required>
					</td>
					<input id="id_bal${count+1}" class="id_bal" name="id_bal${count+1}" value="${info.DATA[0].id_bal}" type="hidden">
				</tr>
			`;
			$("#tblBalones").append(row);
			verificarLineaPS(count+1);
		}
	})
}
function verificarLineaPS(item) {
    count=0;
    flat = false;
    $('#tblBalones > .trBalones').each(function(){
      count++;
    });
	for (var i = 0; i < count; i++) {
        if($("#id_bal"+i).val() == $("#id_bal"+item).val()  && item != i){
            flat = true;
        }
    }
    if(flat){
    	$('#msjmdlProducto').html(`
    		<div class="alert alert-warning alert-dismissible fade show" role="alert">
	            <strong>Advertencia!</strong> El producto ya ha sido escogido.
	            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
	              <span aria-hidden="true">&times;</span>
	            </button>
	        </div>
    	`);
    	borrarlineaPS(item);
    }

}
function borrarlineaPS(item){
    count = 0;
    $('#tblBalones > .trBalones').each(function(){
      count++;
    });
    if (item == count) {
        $('#tblBalones .trBalones'+item).remove();
        if (count == 1) {
			$('#divBalones').css('display','none');
        }
    } else{
    	$('#msjmdlProducto').html(`
    		<div class="alert alert-warning alert-dismissible fade show" role="alert">
	            <strong>Advertencia!</strong> No puede eliminar este Item
	            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
	              <span aria-hidden="true">&times;</span>
	            </button>
	        </div>
    	`);
    }
    var item= $(this).parent().parent().parent().parent().find('.item').val();
    calcularlinea(item);
}
function productoSelectTra(id_bal) {
	var count = 0;
	$('#tblBalonesTra > tbody > tr').each(function(){
		count++;
	});
	__ajax('../controllers/ventasController.php?op=2','POST','JSON',{'id_bal' : id_bal})
	.done(function(info) {
		if (info.STATUS == 'OK') {
			$('#divBalonesTra').css('display','');
			$('#divId_bal').css('display','none');
			$('#sltId_bal > ').remove();
			$('#btnGuiatransportista').removeAttr('disabled');
			var row = `
				<tr>
					<td class="input-group" style="width: 110px">
						<div class="input-group-prepend">
			                <button id="boton${count+1}" onclick="borrarlineaPSTra(${count+1})" type="button" class="boton btn btn-danger"><span class="fas fa-trash-alt"></span></button>
			            </div>
		                <input id="item${count+1}" value="${count+1}" type="text" class="item form-control">
					</td>
					<td>${info.DATA[0].nombre_bal}</td>
					<td>
						<input id="cantidad_balguitra${count+1}" name="cantidad_balguitra${count+1}" class="cantidad_balguitra form-control" type="number" min="1" placeholder="Cantidad" required>
					</td>
					<input id="id_bal${count+1}" name="id_bal${count+1}" value="${info.DATA[0].id_bal}" type="hidden">
				</tr>
			`;
			$("#tblBalonesTra > tbody").append(row);
			verificarLineaPSTra(count+1);
		}
	})
}
function verificarLineaPSTra(item) {
    count=0;
    flat = false;
    $('#tblBalonesTra > tbody > tr').each(function(){
      count++;
    });
	for (var i = 0; i < count; i++) {
        if($("#id_bal"+i).val() == $("#id_bal"+item).val()  && item != i){
            flat = true;
        }
    }
    if(flat){
    	$('#msjmdlProducto').html(`
    		<div class="alert alert-warning alert-dismissible fade show" role="alert">
	            <strong>Advertencia!</strong> El producto ya ha sido escogido.
	            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
	              <span aria-hidden="true">&times;</span>
	            </button>
	        </div>
    	`);
    	borrarlineaPSTra(item);
    }
}
function borrarlineaPSTra(item){
    count = 0;
    $('#tblBalonesTra > tbody > tr').each(function(){
      count++;
    });
    if (item == count) {
    	document.getElementById("tblBalonesTra").deleteRow(item);
        if (count == 1) {
			$('#divBalonesTra').css('display','none');
			$('#btnGuiatransportista').attr('disabled',true);
        }
    } else{
    	$('#msjmdlProducto').html(`
    		<div class="alert alert-warning alert-dismissible fade show" role="alert">
	            <strong>Advertencia!</strong> No puede eliminar este Item
	            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
	              <span aria-hidden="true">&times;</span>
	            </button>
	        </div>
    	`);
    }
    var item= $(this).parent().parent().parent().parent().find('.item').val();
    calcularlinea(item);
}
function frmGuiaremision_CLEAN() {
	document.getElementById("frmGuiaremision").reset();
	$('#id_cli >').remove();
	$('#ubigeoori >').remove();
	$('#ubigeodes >').remove();
	$('#id_per >').remove();
	$('#sltId_bal >').remove();
	$('#tblBalones >').remove();
	$('#divId_bal').css('display','none');
	$('#divBalones').css('display','none');
}
function frmGuiaremisionVALIDATE() {
	var id_cli = $('#id_cli').val();
	var ubigeoori = $('#ubigeoori').val();
	var ubigeodes = $('#ubigeodes').val();
	var direccionori = $('#direccionori').val();
	var direcciondes = $('#direcciondes').val();
	var fecenvio = $('#fecenvio').val();
	var cantbultos = $('#cantbultos').val();
	var peso = $('#peso').val();
	var id_per = $('#id_per').val();
	if (id_cli == null || ubigeoori == null || ubigeodes == null || direccionori == '' || direcciondes == '' || cantbultos == '' || peso == '' || id_per == null) {
		$('#btnGuiaremision').removeAttr('disabled');
		$('#btnGuiaremision').attr('disabled','true');
	} else {
		$('#btnGuiaremision').removeAttr('disabled');
	}
}
function opcionesGuiaremisionOPEN(id_gui) {
	__ajax('../controllers/comprobantesController.php?op=8','POST','JSON',{'id_gui' : id_gui})
	.done(function(info) {
		if (info.STATUS == 'OK') {
			var modal = '';
			modal += `<div class="row">
				          <div class="col">
				            <div class="form-group">
				              <div class="form-control text-center" style="height: 100px;">
								<h5><strong>GUIA DE REMISION REMITENTE</strong></h5>
								<h5><strong>ELECTRONICA</strong></h5>
								<h5><span>${info.DATA[0].serie_gui}</span>-<span>${info.DATA[0].correlativo_gui}</span></h5>
				              </div>
				            </div>
				          </div>
				        </div>
				        <div class="row">
				          <div class="col">
				            <div class="form-group">
				              <div class="form-control" style="height: 90px;">
				                <h5><strong>DESTINATARIO</strong></h5>
				                <h6>${info.DATA[0].nombres_cli}</h6>`;
			if (info.DATA[0].tipdoc_cli == 6){
				modal += `<h6>RUC ${info.DATA[0].numdoc_cli}</h6>`;
			}
			if (info.DATA[0].tipdoc_cli == 1){
				modal += `<h6>DNI ${info.DATA[0].numdoc_cli}</h6>`;
			}
				    modal += `</div>
				            </div>
				          </div>
				        </div>
				        <div class="row">
				          <div class="col">
				            <div class="form-group">
				              <div class="form-control" style="height: 90px;">
				                <h5><strong>ORIGEN</strong></h5>
				                <h6>${info.DATA[0].nombre_ubiori}</h6>
				                <h6>${info.DATA[0].direccionori}</h6>
				              </div>
				            </div>
				          </div>
				        </div>
				        <div class="row">
				          <div class="col">
				            <div class="form-group">
				              <div class="form-control" style="height: 90px;">
				                <h5><strong>DESTINO</strong></h5>
				                <h6>${info.DATA[0].nombre_ubides}</h6>
				                <h6>${info.DATA[0].direcciondes}</h6>
				              </div>
				            </div>
				          </div>
				        </div>
				        <div class="row">
				          <div class="col">
				            <div class="form-group">
				              <div class="form-control" style="height: 90px;">
				                <h5><strong>USUARIO</strong></h5>
				                <h6>INVERSIONES Y MULTISERVICIOS ACN</h6>
				                <h6>${info.DATA[0].nfecemi_gui}</h6>
				              </div>
				            </div>
				          </div>
				        </div>
				        <div class="row">
				          <div class="col">
				            <div class="form-group">
				              <a class="btn btn-primary btn-block" href="../dist/guiaremision/guiaremision${info.DATA[0].id_gui}.pdf" target="_BLANK">VISUALIZAR PDF</a>
				            </div>
				          </div>
				        </div>
			`;
			$('#mdlbodyVerOpcionesGuiaremision').html(modal);
			modalShow('mdlVerOpcionesGuiaremision');
		}
	});
}
function opcionesGuiatransportistaOPEN(id_guitra) {
	__ajax('../controllers/comprobantesController.php?op=10','POST','JSON',{'id_guitra' : id_guitra})
	.done(function(info) {
		if (info.STATUS == 'OK') {
			var modal = '';
			modal += `<div class="row">
				          <div class="col">
				            <div class="form-group">
				              <div class="form-control text-center" style="height: 100px;">
								<h5><strong>GUIA DE TRANSPORTISTA</strong></h5>
								<h5><strong>ELECTRONICA</strong></h5>
								<h5><span>${info.DATA[0].serie_ven}</span>-<span>${info.DATA[0].numero_ven}</span></h5>
				              </div>
				            </div>
				          </div>
				        </div>
				        <div class="row">
				          <div class="col">
				            <div class="form-group">
				              <div class="form-control" style="height: 90px;">
				                <h5><strong>TRANSPORTISTA</strong></h5>
				                <h6>${info.DATA[0].nombres_guitra}</h6>
				                <h6>RUC ${info.DATA[0].ruc_guitra}</h6>
				              </div>
				            </div>
				          </div>
				        </div>
				        <div class="row">
				          <div class="col">
				            <div class="form-group">
				              <div class="form-control" style="height: 70px;">
				                <h5><strong>ORIGEN</strong></h5>
				                <h6>${info.DATA[0].puntopartida_guitra}</h6>
				              </div>
				            </div>
				          </div>
				        </div>
				        <div class="row">
				          <div class="col">
				            <div class="form-group">
				              <div class="form-control" style="height: 70px;">
				                <h5><strong>DESTINO</strong></h5>
				                <h6>${info.DATA[0].puntollegada_guitra}</h6>
				              </div>
				            </div>
				          </div>
				        </div>
				        <div class="row">
				          <div class="col">
				            <div class="form-group">
				              <div class="form-control" style="height: 90px;">
				                <h5><strong>USUARIO</strong></h5>
				                <h6>INVERSIONES Y MULTISERVICIOS ACN</h6>
				                <h6>${info.DATA[0].nfecha_guitra}</h6>
				              </div>
				            </div>
				          </div>
				        </div>
				        <div class="row">
				          <div class="col">
				            <div class="form-group">
				              <a class="btn btn-primary btn-block" href="../dist/guiatransportista/guiatransportista${info.DATA[0].id_guitra}.pdf" target="_BLANK">VISUALIZAR PDF</a>
				            </div>
				          </div>
				        </div>
			`;
			$('#mdlbodyVerOpcionesGuiatransportista').html(modal);
			modalShow('mdlVerOpcionesGuiatransportista');
		}
	});
}