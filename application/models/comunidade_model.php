<?php
class Comunidade_model extends CI_Model {

    public function __construct() {
		$this->load->database();
	}
	
	public function getCurrent() {
		$id = $this->session->userdata('id_comunidade');
		$dados = null;
		$query = $this->db->where('id',$id)->get('comunidade');
		foreach($query->result() as $row) {
			$dados = get_object_vars($row);
		}
		return $dados;	
	}
	
	public function login() {
		$email = $this->input->post('email');
		$senha = $this->input->post('senha');
		$array = array();
		$query = $this->db->
		    where('email',$email)->
			where('senha',md5($senha))->get('comunidade');
		foreach ($query->result() as $row) {
			$array[] = get_object_vars($row);
		}
		return $array;
	}
	
	public function changePassword() {
		$id_comunidade = $this->session->userdata('id_comunidade');
		$dados['senha'] = md5($this->input->post('senha'));
		$this->db->where('id',$id_comunidade)->update('comunidade',$dados);
	}
	
}
?>