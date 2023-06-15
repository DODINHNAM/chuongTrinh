package com.example.helper.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "useradmin")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserAdmin {
	@Id
	@Column(name = "user_ad_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long user_ad_id;
	@Column(name = "user_ad_name")
	private String user_ad_name;
	@Column(name = "user_ad_email")
	private String user_ad_email;
	@Column(name = "user_ad_pass")
	private String user_ad_pass;
	@Column(name = "user_ad_role")
	private long user_ad_role;
	

}
