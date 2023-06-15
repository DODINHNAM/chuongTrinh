package com.example.helper.controller.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LoginAdminResponse {
	private String auth;
	private String username;
	private Long userId;
	private long role;
	public LoginAdminResponse(String auth, String username, long role) {
		super();
		this.auth = auth;
		this.username = username;
		this.role= role;
	}
	
}
