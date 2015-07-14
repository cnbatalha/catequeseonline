<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Catequista extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		$this->load->model('catequista_model');
		if($this->session->userdata('id_comunidade') == false) {
			show_404();
		}
	}
	
	public function index() {
		$dados['catequizandos'] = $this->catequizandos_model->getAll();
		$this->load->view('catequizandos/index',$dados);
	}
	
	public function formulario($id = 0) {
		if(isset($_POST['submit'])) {
			$this->catequizandos_model->saveOrUpdate();
			redirect('catequizandos');
		} else {	
			if($id == 0) {
				$dados['catequizando'] = null;
				$this->load->view('catequizandos/form',$dados);
			} else {
				$dados['catequizando'] = $this->catequizandos_model->getById($id);
				$this->load->view('catequizandos/form',$dados);
			}		
		}
		
	}
	
	public function historico($id) {
		$dados['turmas'] = $this->catequizandos_model->getHistorico($id);
		$this->load->view('catequizandos/historico',$dados);
	}
	
}

