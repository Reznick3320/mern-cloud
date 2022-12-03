import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createDir } from "../../../actions/file";
import { setPopupDisplay } from './../../../reducers/fileReduces';
import Input from './../../../utils/input/Input';

const Popup = () => {
	const [dirName, setDirName] = useState('');
	const popupDisplay = useSelector(state => state.files.popupDisplay)
	const currentDir = useSelector(state => state.files.currentDir)
	const dispatch = useDispatch()

	function createHandler() {
		dispatch(createDir(currentDir, dirName));
		dispatch(setPopupDisplay('none'));
		setDirName('');
	}

	return (
		<div className="popup" onClick={() => dispatch(setPopupDisplay('none'))} style={{ display: popupDisplay }}>
			<div className="popup__content" onClick={(event) => event.stopPropagation()}>
				<div className="popup__header">
					<div className="popup__title">Создать новую папку</div>
					<div className="popup__close" onClick={() => dispatch(setPopupDisplay('none'))}>X</div>
				</div>
				<Input type="text" placeholder="Введите название папки..." value={dirName} setValue={setDirName} />
				<button className="popup__create" onClick={() => createHandler()}>Создать</button>
			</div>
		</div>
	)
}

export default Popup;