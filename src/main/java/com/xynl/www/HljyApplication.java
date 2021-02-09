package com.xynl.www;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.xynl.www.dao")
public class HljyApplication {

	public static void main(String[] args) {
		SpringApplication.run(HljyApplication.class, args);
	}

}
