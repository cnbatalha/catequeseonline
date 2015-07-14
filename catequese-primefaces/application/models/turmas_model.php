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
	
	public function getMatriculados($id_turma) {
		$dados = array();
		$id_comunidade = $this->session->userdata('id_comunidade');
		$this->db->select('catequizandos.nome,matriculados.data_matricula, turmas.descricao');
		$this->db->from('matriculados');
		$this->db->join('catequizandos', 'catequizandos.id = matriculados.catequizando');
		$this->db->join('turmas', 'turmas.id = matriculados.turma');
		$this->db->where('turmas.id',$id_turma);
		$this->db->where('turmas.comunidade',$id_comunidade);
		$this->db->where('matriculados.atual',1);
		$query = $this->db->get();
		foreach($query->result() as $row) {
			$dados[] = get_object_vars($row);
		}
		return $dados;
	}
	
	public function matricular() {
		$id_turma = $this->input->post('id_turma');
		$id_catequizandos = $this->input->post('id_catequizandos');
		
		foreach($id_catequizandos as $id_cat) {
			//primeiro desmatriculo das turmas antigas
			$dados = array('atual' => 0);
			$this->db->where('catequizando', $id_cat)->where('turma !=',$id_turma);
			$this->db->update('matriculados', $dados);
			
			//verifico se já está matriculado nessa turma
			$query = $this->db->where('turma',$id_turma)->where('catequizando',$id_cat)->where('atual',1)->get('matriculados');
			if ($query->num_rows() > 0) {
				continue;
			}
			
			//agora matriculo
			$dados = array(
				'turma' => $id_turma,
				'catequizando' => $id_cat,
				'data_matricula' => date('Y-m-d'),
				'atual' => 1
			);
			$this->db->insert('matriculados', $dados); 
		}
	}
}
?>