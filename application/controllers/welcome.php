<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends CI_Controller {
	
	public function index() {
		$this->load->view('index');
	}
	
	public function info() {
		$this->load->view('info');
	}
	
	public function login() {
		if(isset($_POST['submit'])) {
			$this->load->model('comunidade_model');
			$comunidade = $this->comunidade_model->login();
			if(empty($comunidade)) {
				$dados['error'] = true;
				$this->load->view('login',$dados);
			} else {
				$this->session->set_userdata('id_comunidade', $comunidade[0]['id']);
				redirect('inicio');
			}
		} else {
			$this->load->view('login');
		}
	}
	
	public function inicio() {
		if($this->session->userdata('id_comunidade') == false) {
			show_404();
		}
		$this->load->model('comunidade_model');
		$dados['comunidade'] = $this->comunidade_model->getCurrent();
		$this->load->view('inicio',$dados);
	}
	
	public function troca_senha() {
		if($this->session->userdata('id_comunidade') == false) {
			show_404();
		}
		if(isset($_POST['submit'])) {
			$this->load->model('comunidade_model');
			$this->comunidade_model->changePassword();
			redirect('inicio');
		} else {
			$this->load->view('troca_senha');
		}
	}
	
	public function sair() {
		$this->session->sess_destroy();
		redirect('');
	}
}

