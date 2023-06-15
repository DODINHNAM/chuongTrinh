package com.example.helper.params;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserParam extends BaseParam {
	private String userName;
	private long phone;
	private String email;
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public long getPhone() {
		return phone;
	}
	public void setPhone(long phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	
}
