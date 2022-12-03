import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createDir, getFiles } from "../../actions/file";
import FileList from "./fileList/FileList";

import "./disk.css"
import Popup from "./fileList/Popup";
import { setPopupDisplay, setCurrentDir } from './../../reducers/fileReduces';
import { uploadFile } from './../../actions/file';


const Disk = () => {
	const dispatch = useDispatch()
	const currentDir = useSelector(state => state.files.currentDir)
	const dirStack = useSelector(state => state.files.dirStack)
	const [dragEnter, setDragEnter] = useState(false)

	useEffect(() => {
		dispatch(getFiles(currentDir))
	}, [currentDir])

	function showPopupHandler() {
		dispatch(setPopupDisplay('flex'))
	}

	function backClickHandler() {
		const backDirId = dirStack.pop()
		dispatch(setCurrentDir(backDirId))
	}

	function fileUploadHandler(event) {
		const files = [...event.target.files]
		files.forEach(file => dispatch(uploadFile(file, currentDir)))
	}

	function dragEnterHandler(event) {
		event.preventDefault()
		event.stopPropagation()
		setDragEnter(true)
	}

	function dragLeaveHandler(event) {
		event.preventDefault()
		event.stopPropagation()
		setDragEnter(false)
	}

	function dropHandler(event) {
		event.preventDefault()
		event.stopPropagation()
		let files = [...event.dataTransfer.files]
		files.forEach(file => dispatch(uploadFile(file, currentDir)))
		setDragEnter(false)
	}

	return (!dragEnter ?
		<div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
			<div className="disk__btns">
				<button className="disk__back" onClick={() => backClickHandler()}>Назад</button>
				<button className="disk__create" onClick={() => showPopupHandler()}>Создать папку</button>
				<div className="disk__upload">
					<label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
					<input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file" id="disk__upload-input" className="disk__upload-input" />
				</div>
			</div>
			<FileList />
			<Popup />
		</div>
		:
		<div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
			Перетащите файлы сюда
		</div>
	);
};

export default Disk;