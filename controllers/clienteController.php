<?php
require_once '../models/dao/clienteDao.php';
require_once '../models/dao/ventaDao.php';

require_once '../models/bean/clienteBean.php';

if (isset($_GET['op'])) {
	$op = $_GET['op'];
}
if (isset($_POST['op'])) {
	$op = $_POST['op'];
}
$objClienteDao = new clienteDao();
$objVentaDao = new ventaDao();

$objClienteBean = new clienteBean();
session_start();
$Sid_per = $_SESSION['ID_PER'];
$Stipo_per = $_SESSION['TIPO_PER'];
switch ($op) {
	case 1: {
			$clienteSELECT = $objClienteDao->clienteSELECT();
			unset($_SESSION['clienteSELECT']);
			$_SESSION['clienteSELECT'] = $clienteSELECT;
			$page = "../views/cliente/clientePrincipal.php";
			break;
		}
	case 2: {
			$nombres_cli = $_POST['txtNombres_cli'];
			$tipdoc_cli = $_POST['sltTipdoc_cli'];
			$numdoc_cli = $_POST['nbrNumdoc_cli'];
			$telefono_cli = $_POST['telefono_cli'];
			$direccion_cli = $_POST['direccion_cli'];
			$referencia_cli = $_POST['referencia_cli'];
			$correo_cli = $_POST['correo_cli'];
			$objClienteBean->setNombres_cli($nombres_cli);
			$objClienteBean->setTipdoc_cli($tipdoc_cli);
			$objClienteBean->setNumdoc_cli($numdoc_cli);
			$objClienteBean->setTelefono_cli($telefono_cli);
			$objClienteBean->setDireccion_cli($direccion_cli);
			$objClienteBean->setReferencia_cli($referencia_cli);
			$objClienteBean->setCorreo_cli($correo_cli);
			$response = $objClienteDao->clienteINSERT($objClienteBean);
			echo json_encode($response);
			exit();
			break;
		}
	case 3: {
			$id_cli = $_GET['id_cli'];
			$clienteDATA = $objClienteDao->clienteDATA($id_cli);
			unset($_SESSION['clienteDATA']);
			$_SESSION['clienteDATA'] = $clienteDATA;
			$page = "../views/cliente/frmClienteUPDATE.php";
			break;
		}
	case 4: {
			$id_cli = $_POST['id_cli'];
			$nombres_cli = $_POST['txtNombres_cli'];
			$tipdoc_cli = $_POST['sltTipdoc_cli'];
			$numdoc_cli = $_POST['nbrNumdoc_cli'];
			$telefono_cli = $_POST['telefono_cli'];
			$direccion_cli = $_POST['direccion_cli'];
			$referencia_cli = $_POST['referencia_cli'];
			$correo_cli = $_POST['correo_cli'];
			$objClienteBean->setId_cli($id_cli);
			$objClienteBean->setNombres_cli($nombres_cli);
			$objClienteBean->setTipdoc_cli($tipdoc_cli);
			$objClienteBean->setNumdoc_cli($numdoc_cli);
			$objClienteBean->setTelefono_cli($telefono_cli);
			$objClienteBean->setDireccion_cli($direccion_cli);
			$objClienteBean->setReferencia_cli($referencia_cli);
			$objClienteBean->setCorreo_cli($correo_cli);
			$response = $objClienteDao->clienteUPDATE($objClienteBean);
			echo json_encode($response);
			exit();
			break;
		}
	case 5: {
			$id_cli = $_POST['id_cli'];
			$response = $objClienteDao->clienteDELETE($id_cli);
			echo json_encode($response);
			exit();
			break;
		}
	case 6: {
			$clienteSELECT = $objClienteDao->clienteSELECT();
			echo json_encode($clienteSELECT);
			exit();
			break;
		}
	case 7: {
			if ($Stipo_per == '1' && $Stipo_per == '2') {
				$creditoLIST = $objClienteDao->creditoLIST();
			} else {
				$creditoLIST = $objClienteDao->creditoLIST_idper($Sid_per);
			}
			unset($_SESSION['creditoLIST']);
			$_SESSION['creditoLIST'] = $creditoLIST;
			$page = "../views/cliente/frmCreditos.php";
			break;
		}
	case 8: {
			$id_ven = $_POST['id_ven'];
			if (isset($_POST['tipo_pago'])) {
				$tipo_pago = 2; //parcial
			} else {
				$tipo_pago = 1; //total
			}
			if (isset($_POST['modo_pago'])) {
				$modo_pago = 2; //tarjeta
			} else {
				$modo_pago = 1; //efectivo
			}
			$nutarjeta_pago = $_POST['nutarjeta_pago'];
			$observacion_pago = $_POST['observacion_pago'];
			$monto_pago = $_POST['monto_pago'];
			$objClienteBean->setTipo_pago($tipo_pago);
			$objClienteBean->setModo_pago($modo_pago);
			$objClienteBean->setNutarjeta_pago($nutarjeta_pago);
			$objClienteBean->setObservacion_pago($observacion_pago);
			$objClienteBean->setMonto_pago($monto_pago);
			$objClienteBean->setId_ven($id_ven);
			$response = $objClienteDao->pagoINSERT($objClienteBean, $Sid_per);
			if ($response['STATUS'] == 'OK') {
				$response = $objVentaDao->pago_venUPDATE($monto_pago, $id_ven);
			}
			echo json_encode($response);
			exit();
			break;
		}
	case 9: {
			$fecha =  $_POST['fechaPicker'];
			list($inicio, $barra, $fin) = explode(" ", $fecha);
			$fin = date('Y-m-d', strtotime($fin));
			$inicio = date('Y-m-d', strtotime($inicio));
			$response = $objClienteDao->creditoListFecha($inicio, $fin);

			if (!empty($response['DATA'])) {
				$nombre = 'reporte.xls';
				header("Content-Type: application/vnd.ms-excel");
				header("Content-Disposition: attachment; filename=" . $nombre);

				$mostrar_columnas = false;

				foreach ($response['DATA'] as $data) {
					if (!$mostrar_columnas) {
						echo implode("\t", array_keys($data)) . "\n";
						$mostrar_columnas = true;
					}
					echo implode("\t", array_values($data)) . "\n";
				}
			} else {
				echo 'No hay datos a exportar';
			}
			exit();
			break;
		}
}
header("Location:" . $page);
