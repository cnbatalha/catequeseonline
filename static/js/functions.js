function confirmSubmit() {
	return confirm("Deseja mesmo salvar?");
}

function confirmSubmitWithChange(nameA, nameB, msg) {
	var valorA = $('[name='+nameA+']').val();
	var valorB = $('[name='+nameB+']').val();
	
	if(valorA != valorB && valorA != "") {
		return confirm("Deseja mesmo salvar?\n" + msg);
	} else {
		return confirm("Deseja mesmo salvar?");
	}
}