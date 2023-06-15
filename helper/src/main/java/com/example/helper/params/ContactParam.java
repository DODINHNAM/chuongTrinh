package com.example.helper.params;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactParam extends BaseParam{
	private String contactName;
	private String contactEmail;
	private String status;
}
