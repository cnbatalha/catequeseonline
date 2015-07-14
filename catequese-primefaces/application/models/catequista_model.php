<?php
class Catequista_model extends CI_Model {

    public function __construct() {
		$this->load->database();
	}
	
	public function saveOrUpdate() {
		
		$id = $this->input->post('id_catequista');
		
		$dados = array(
			'comunidade' => $this->session->userdata('id_comunidade'),
			'nome' => $this->input->post('nome'),
			'telefone' => $this->input->post('telefone'),
			'email' => $this->input->post('email'),
			'endereco' => $this->input->post('endereco'),
			'data_nascimento' => dateToUS($this->input->post('data_nascimento')),
			'data_batismo' => empty($_POST['data_batismo']) ? NULL : dateToUS($this->input->post('data_batismo')),
			'frequencia_missa' => empty($_POST['frequencia_missa']) ? NULL : $this->input->post('frequencia_missa')
		);
		
		if(empty($id)) {
			$dados['data_inscricao'] = date('Y-m-d');
			$this->db->insert('catequista', $dados); 
		} else {
			$this->db->where('id',$id)->update('catequista',$dados);
		}
	}
    
    public function getAll() {
    	$id_comunidade = $this->session->userdata('id_comunidade');
		$busca = $this->input->get('busca');
		$dados = array();
		$this->db->where('comunidade',$id_comunidade);
		if(!empty($busca)) {
			$this->db->like('nome',$busca,'both');
		}
		$query = $this->db->get('catequista');
		foreach($query->result() as $row) {
			$dados[] = get_object_vars($row);
		}
		return $dados;
	}
	
	public function getById($id) {
		$id_comunidade = $this->session->userdata('id_comunidade');
		$dados = null;
		$query = $this->db->where('id',$id)->where('comunidade',$id_comunidade)->get('catequista');
		foreach($query->result() as $row) {
			$dados = get_object_vars($row);
		}
		return $dados;
	}
	
	/*
	 * 
	 * 
	 * public function getHistorico($id) {
		$dados = array();
		$id_comunidade = $this->session->userdata('id_comunidade');
		$this->db->select('catequizandos.nome,matriculados.data_matricula, turmas.descricao, matriculados.atual');
		$this->db->from('matriculados');
		$this->db->join('catequizandos', 'catequizandos.id = matriculados.catequizando');
		$this->db->join('turmas', 'turmas.id = matriculados.turma');
		$this->db->where('catequizandos.id',$id);
		$this->db->where('catequizandos.comunidade',$id_comunidade);
		$this->db->order_by('matriculados.atual', 'desc'); 
		$query = $this->db->get();
		foreach($query->result() as $row) {
			$dados[] = get_object_vars($row);
		}
		return $dados;
	}
	
	*
	*
	*/
    
}
?>
