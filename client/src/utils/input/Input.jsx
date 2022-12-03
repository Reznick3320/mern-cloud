import React from "react";
import './input.css'

const Input = (prors) => {
	return (
		<input onChange={event => prors.setValue(event.target.value)}
			value={prors.value}
			type={prors.type}
			placeholder={prors.placeholder} />
	)
}

export default Input;