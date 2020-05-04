package com.example.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;

import com.example.dto.BaseDTO;
import com.example.entidades.Base;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.JpaRepository;


public abstract class BaseService <ENTITY extends Base, DTO extends BaseDTO> implements IBaseService <DTO>{
			
	private JpaRepository repository;
	private Class dtoClass;
	private Class entityClass;
	
	public BaseService(JpaRepository repository, Class dtoClass, Class entityClass) {
		this.repository = repository;
		this.dtoClass = dtoClass;
		this.entityClass = entityClass;
	}
	
	@Transactional
	public List<DTO> findAll() throws Exception {
		
		List<ENTITY> entities = repository.findAll();
		List<DTO> dtos = new ArrayList<>();
		
		try {
		
			ModelMapper modelMapper = new ModelMapper();
			
			for (ENTITY item : entities) {
				
				DTO dto = (DTO) modelMapper.map(item, dtoClass);
				dtos.add(dto);
				
			}
		
		} catch (Exception e) {
			
			throw new Exception();
			
		}
		
		return dtos;
		
	}
	
	@Transactional
	public DTO findById(int id) throws Exception {
		
		Optional<ENTITY> entityOptional = repository.findById(id);
		
		try {
			
			ENTITY entity = entityOptional.get();			
			ModelMapper modelMapper = new ModelMapper();			
			return (DTO) modelMapper.map(entity, dtoClass);
			
		} catch (Exception e) {
			
			throw new Exception();
			
		}
		
	}

	@Transactional
	public DTO save (DTO dto) throws Exception {

		ENTITY entity;
		ModelMapper modelMapper = new ModelMapper();

		try {

			entity = (ENTITY) modelMapper.map(dto, entityClass);
			entity = (ENTITY) repository.save(entity);

			return (DTO) modelMapper.map(entity, dtoClass);

		} catch (Exception e) {

			System.out.println(e);
			throw new Exception();

		}

	}
}
