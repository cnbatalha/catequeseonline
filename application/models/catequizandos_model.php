<?php
class Catequizandos_model extends CI_Model {

    public function __construct() {
		$this->load->database();
	}
	
	public function saveOrUpdate() {
		$id = $this->input->post('id_catequizando');
		$dados = array(
			'comunidade' => $this->session->userdata('id_comunidade'),
			'nome' => $this->input->post('nome'),
			'nome_pai' => $this->input->post('nome_pai'),
			'telefone_pai' => $this->input->post('telefone_pai'),
			'email_pai' => empty($_POST['email_pai']) ? NULL : $this->input->post('email_pai'),
			'nome_mae' => $this->input->post('nome_mae'),
			'telefone_mae' => $this->input->post('telefone_mae'),
			'email_mae' => empty($_POST['email_mae']) ? NULL : $this->input->post('email_mae'),
			'endereco' => $this->input->post('endereco'),
			'data_nascimento' => dateToUS($this->input->post('data_nascimento')),
			'batizado' => getCheckboxValue($this->input->post('batizado')),
			'data_batismo' => empty($_POST['data_batismo']) ? NULL : dateToUS($this->input->post('data_batismo')),
			'paroquia_batismo' => empty($_POST['paroquia_batismo']) ? NULL : $this->input->post('paroquia_batismo'),
			'nome_padrinho' => empty($_POST['nome_padrinho']) ? NULL : $this->input->post('nome_padrinho'),
			'nome_madrinha' => empty($_POST['nome_madrinha']) ? NULL : $this->input->post('nome_madrinha'),
			'eucaristia' => getCheckboxValue($this->input->post('eucaristia')),
			'data_eucaristia' => empty($_POST['data_eucaristia']) ? NULL : dateToUS($this->input->post('data_eucaristia')),
			'paroquia_eucaristia' => empty($_POST['paroquia_eucaristia']) ? NULL : $this->input->post('paroquia_eucaristia'),
			'coroinha' => getCheckboxValue($this->input->post('coroinha')),
			'pais_reunioes' => getCheckboxValue($this->input->post('pais_reunioes')),
			'pais_atividades' => getCheckboxValue($this->input->post('pais_atividades')),
			'frequencia_missa' => empty($_POST['frequencia_missa']) ? NULL : $this->input->post('frequencia_missa'),
			'mora_pais' => getCheckboxValue($this->input->post('mora_pais')),
			'pais_casados' => getCheckboxValue($this->input->post('pais_casados'))
		);
		if(empty($id)) {
			$dados['data_inscricao'] = date('Y-m-d');
			$this->db->insert('catequizandos', $dados); 
		} else {
			$this->db->where('id',$id)->update('catequizandos',$dados);
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
		$query = $this->db->get('catequizandos');
		foreach($query->result() as $row) {
			$dados[] = get_object_vars($row);
		}
		return $dados;
	}
	
	public function getById($id) {
		$id_comunidade = $this->session->userdata('id_comunidade');
		$dados = null;
		$query = $this->db->where('id',$id)->where('comunidade',$id_comunidade)->get('catequizandos');
		foreach($query->result() as $row) {
			$dados = get_object_vars($row);
		}
		return $dados;
	}
    
}
?>
