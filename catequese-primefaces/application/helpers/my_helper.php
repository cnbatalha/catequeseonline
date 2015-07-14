<?php

function dateToBr($string) {
	if(!empty($string)) {
		$parts = explode('-',$string);
		return $parts[2].'/'.$parts[1].'/'.$parts[0];
	} else {
		return '';
	}
}

function dateToUS($string) {
	if(!empty($string)) {
		$parts = explode('/',$string);
		return $parts[2].'-'.$parts[1].'-'.$parts[0];
	} else {
		return '';
	}
}

function getCheckboxValue($value) {
	if(empty($value)) {
		return 0;
	}
	return 1;
}


?>
