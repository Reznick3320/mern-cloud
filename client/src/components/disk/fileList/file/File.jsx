import React from 'react';
import './file.css'
import dirLogo from '../../../../assets/img/dir.svg'
import fileLogo from '../../../../assets/img/file.svg'
import { useDispatch, useSelector } from 'react-redux';
import { pushToStack, setCurrentDir } from './../../../../reducers/fileReduces';
import { downloadFile } from '../../../../actions/file';
import { deleteFile } from './../../../../actions/file';
const File = ({ file }) => {
	const dispatch = useDispatch();
	const currentDir = useSelector(state => state.files.currentDir)

	function openDirHandler(file) {
		if (file.type === 'dir') {
			dispatch(pushToStack(currentDir));
			dispatch(setCurrentDir(file._id));
		}

	}

	function downloadClickHandler(e) {
		e.stopPropagation();
		downloadFile(file);
	}

	function deleteFileHandler(e) {
		e.stopPropagation()
		dispatch(deleteFile(file))
	}

	return (
		<div className='file' onClick={() => openDirHandler(file)}>
			<img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img" />
			<div className="file__name">{file.name}</div>
			<div className="file__date">{file.date.slice(0, 10)}</div>
			<div className="file__size">{file.size}</div>
			{file.type !== "dir" && <button className='file__btn file__download' onClick={(e) => downloadClickHandler(e)}>Скачать</button>}
			<button className='file__btn file__delete' onClick={(e) => deleteFileHandler(e)}>Удалить</button>
		</div>
	);
};

export default File;
