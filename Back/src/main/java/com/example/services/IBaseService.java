package com.example.services;

import java.util.List;
import javax.transaction.Transactional;

public interface IBaseService <DTO>{

	public List<DTO> findAll() throws Exception;
	
	public DTO findById(Long id) throws Exception;

	public DTO save (DTO dto) throws Exception;

	public DTO update (Long id, DTO dto) throws Exception;

	public boolean delete(Long id) throws Exception;
}
