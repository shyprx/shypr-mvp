package com.elm.shypr;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ShyprApplication {

	private static final Logger LOGGER = LoggerFactory.getLogger(ShyprApplication.class);

	public static void main(String[] args) {

		LOGGER.info("Starting ...............................................................................");
		SpringApplication.run(ShyprApplication.class, args);
	}

}
