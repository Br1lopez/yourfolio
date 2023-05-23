package com.yourfolio.yourfolio.controllers;

import com.yourfolio.yourfolio.dtos.UserDTO;
import com.yourfolio.yourfolio.dtos.UserSaveDTO;
import com.yourfolio.yourfolio.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
@AllArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    private final UserService userService;


    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody UserSaveDTO userSaveDTO){
        return new ResponseEntity<>(userService.registerUser(userSaveDTO), HttpStatus.CREATED);
    }

}
