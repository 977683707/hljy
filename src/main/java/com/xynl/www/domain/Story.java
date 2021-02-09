package com.xynl.www.domain;

import java.util.List;

public class Story {
    private Integer id;

    private String title;

    private String introduction;

    private String titme;

    private Integer blessing;

    private String photo;

    private String article;

    private List<Blessing> blessings;

    public List<Blessing> getBlessings() {
        return blessings;
    }

    public void setBlessings(List<Blessing> blessings) {
        this.blessings = blessings;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public String getTitme() {
        return titme;
    }

    public void setTitme(String titme) {
        this.titme = titme;
    }

    public Integer getBlessing() {
        return blessing;
    }

    public void setBlessing(Integer blessing) {
        this.blessing = blessing;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getArticle() {
        return article;
    }

    public void setArticle(String article) {
        this.article = article;
    }


}