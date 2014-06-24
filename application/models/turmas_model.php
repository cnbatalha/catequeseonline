<?php
class Turmas_model extends CI_Model {
	
	public function __construct() {
		$this->load->database();
	}
	
	public function saveOrUpdate() {
		$id = $this->input->post('id_turma');
		$dados = array(
			'descricao' => $this->input->post('descricao'),
			'comunidade' => $this->session->userdata('id_comunidade'),
			'horario' => $this->input->post('horario'),
			'dia_semana' => $this->input->post('dia_semana'),
			'ano' => $this->input->post('ano'),
			'sala' => empty($_POST['sala']) ? NULL : $this->input->post('sala')
		);
		if(empty($id)) {
			$this->db->insert('turmas', $dados); 
		} else {
			$this->db->where('id',$id)->update('turmas',$dados);
		}
	}
	
	public function getAll() {
		$id_comunidade = $this->session->userdata('id_comunidade');
		$dados = array();
		$this->db->where('comunidade',$id_comunidade);
		$query = $this->db->get('turmas');
		foreach($query->result() as $row) {
			$dados[] = get_object_vars($row);
		}
		return $dados;
	}
	
	public function getById($id) {
		$id_comunidade = $this->session->userdata('id_comunidade');
		$dados = null;
		$this->db->where('id',$id)->where('comunidade',$id_comunidade);
		$query = $this->db->get('turmas');
		foreach($query->result() as $row) {
			$dados = get_object_vars($row);
		}
		return $dados;
	}
}
?>