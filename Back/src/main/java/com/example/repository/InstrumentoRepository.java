package com.example.repository;

import com.example.entidades.Instrumentos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstrumentoRepository extends JpaRepository<Instrumentos, Integer> {
}
