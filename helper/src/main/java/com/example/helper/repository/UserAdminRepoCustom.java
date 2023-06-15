package com.example.helper.repository;

import java.util.List;

import com.example.helper.controller.request.LoginRequest;
import com.example.helper.entity.UserAdmin;

public interface UserAdminRepoCustom {
	public List<UserAdmin> loginAdmin(LoginRequest loginRequest);
}
