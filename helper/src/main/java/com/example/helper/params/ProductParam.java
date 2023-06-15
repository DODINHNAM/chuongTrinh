package com.example.helper.params;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductParam extends BaseParam {
	private long productID;
	private long categoryID;
	private long brandID;
	private String productName;
	private long priceFrom;
	private long priceTo;
	private boolean inventory;
	public long getProductID() {
		return productID;
	}
	public void setProductID(long productID) {
		this.productID = productID;
	}
	public long getCategoryID() {
		return categoryID;
	}
	public void setCategoryID(long categoryID) {
		this.categoryID = categoryID;
	}
	public long getBrandID() {
		return brandID;
	}
	public void setBrandID(long brandID) {
		this.brandID = brandID;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public long getPriceFrom() {
		return priceFrom;
	}
	public void setPriceFrom(long priceFrom) {
		this.priceFrom = priceFrom;
	}
	public long getPriceTo() {
		return priceTo;
	}
	public void setPriceTo(long priceTo) {
		this.priceTo = priceTo;
	}
	public boolean isInventory() {
		return inventory;
	}
	public void setInventory(boolean inventory) {
		this.inventory = inventory;
	}
	
	

}
