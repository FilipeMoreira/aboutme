create database db_school;
use db_school;
create table student(
	id int auto_increment primary key,
    s_name varchar(60) not null,
    age int not null
);
create table professor(
	id int auto_increment primary key,
    p_name varchar(60) not null,
    area varchar(25) not null
);
create table class(
	id int auto_increment primary key,
    area varchar(25) not null,
    room_number int not null,
    id_professor int not null,
    foreign key (id_professor) references professor(id)
);

insert into student values (1,'John',15);
insert into student(s_name,age) values ('Jack',16);
insert into student(s_name,age) values ('Rebecca',17);
insert into student(s_name,age) values ('Lizzy',18);
insert into student(s_name,age) values ('Robert',16);
insert into student(s_name,age) values ('Richard',16);
insert into student(s_name,age) values ('Amy',18);
insert into student(s_name,age) values ('Hilary',15);
insert into student(s_name,age) values ('Mark',16);
insert into student(s_name,age) values ('Tom',19);
insert into student(s_name,age) values ('Natasha',16);
insert into student(s_name,age) values ('Kelly',15);
insert into student(s_name,age) values ('Nicholas',16);
insert into student(s_name,age) values ('Harry',16);
insert into student(s_name,age) values ('Rachel',16);

insert into professor(p_name,area) values ('Clark','Computer Science');
insert into professor(p_name,area) values ('Jullie','Computer Science');
insert into professor(p_name,area) values ('Richard','Computer Science');
insert into professor(p_name,area) values ('Andre','Computer Science');
insert into professor(p_name,area) values ('Amanda','Computer Science');
insert into professor(p_name,area) values ('Antonio','Computer Science');
insert into professor(p_name,area) values ('Valeska','Computer Science');
insert into professor(p_name,area) values ('Catra','Computer Science');
insert into professor(p_name,area) values ('Marcus','Computer Science');
insert into professor(p_name,area) values ('Paul','Computer Science');
insert into professor(p_name,area) values ('Finn','Computer Science');
insert into professor(p_name,area) values ('Anne','Computer Science');
insert into professor(p_name,area) values ('Vera','Computer Science');
insert into professor(p_name,area) values ('Maria','Computer Science');
insert into professor(p_name,area) values ('Mariana','Computer Science');

insert into class(area,room_number,id_professor) value ('Computer Science',102,1);
insert into class(area,room_number,id_professor) value ('Computer Science',103,2);
insert into class(area,room_number,id_professor) value ('Computer Science',102,4);
insert into class(area,room_number,id_professor) value ('Computer Science',106,5);
insert into class(area,room_number,id_professor) value ('Computer Science',106,3);
insert into class(area,room_number,id_professor) value ('Computer Science',102,6);
insert into class(area,room_number,id_professor) value ('Computer Science',1001,7);
insert into class(area,room_number,id_professor) value ('Computer Science',1012,1);
insert into class(area,room_number,id_professor) value ('Computer Science',109,8);
insert into class(area,room_number,id_professor) value ('Computer Science',110,9);
insert into class(area,room_number,id_professor) value ('Computer Science',102,10);
insert into class(area,room_number,id_professor) value ('Computer Science',102,11);
insert into class(area,room_number,id_professor) value ('Computer Science',103,12);
insert into class(area,room_number,id_professor) value ('Computer Science',106,13);
insert into class(area,room_number,id_professor) value ('Computer Science',109,14);