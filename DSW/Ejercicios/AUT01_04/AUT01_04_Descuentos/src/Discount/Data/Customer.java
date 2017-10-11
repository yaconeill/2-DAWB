/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Discount.Data;

/**
 *
 * @author Yaco
 */
public class Customer {

    String name;
    Boolean member = false;
    String memberType;

    public Customer(String name, String memberType) {
        this.name = name;
        this.memberType = memberType;
    }

    public Customer() {
    }

    public Boolean isMember() {
        return this.member;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getMember() {
        return member;
    }

    public void setMember(Boolean member) {
        this.member = member;
    }

    public String getMemberType() {
        return memberType;
    }

    public void setMemberType(String memberType) {
        this.memberType = memberType;
    }

    @Override
    public String toString() {
        if (member) {
            return ("\nNombre: " + name + "\nMiembro: " + "si"
                + "\nTipo de miembro: " + memberType);
        } else {
            return ("\nNombre: " + name + "\nMiembro: " + "no"
                + "\nDebe registrarse para usar nuestros servicios.");
        }
        
    }
}
