<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Turmas extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		$this->load->model('turmas_model');
		if($this->session->userdata('id_comunidade') == false) {
			show_404();
		}
	}
	
	public function index() {
		$dados['turmas'] = $this->turmas_model->getAll();
		$this->load->view('turmas/index',$dados);
	}
	
	public function formulario($id = 0) {
		if(isset($_POST['submit'])) {
			$this->turmas_model->saveOrUpdate();
			redirect('turmas');
		} else {			
			if($id == 0) {
				$dados['turma'] = null;
				$this->load->view('turmas/form',$dados);
			} else {
				$dados['turma'] = $this->turmas_model->getById($id);
				$this->load->view('turmas/form',$dados);
			}
		}
	}
	
}

?>	