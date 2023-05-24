package com.yourfolio.yourfolio.controllers;

import com.yourfolio.yourfolio.dtos.ElementDTO;
import com.yourfolio.yourfolio.dtos.UserDTO;
import com.yourfolio.yourfolio.dtos.UserSaveDTO;
import com.yourfolio.yourfolio.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

//todo: administrar error de usuario repetido
@CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody UserSaveDTO userSaveDTO){
        return new ResponseEntity<>(userService.registerUser(userSaveDTO), HttpStatus.CREATED);
    }

    @PostMapping("/{userId}/portfolios")
    public ResponseEntity<List<ElementDTO>> getUserPortfoliosById(@PathVariable Integer userId){
        return new ResponseEntity<>(userService.getUserPortfolios(userId), HttpStatus.OK);
    }

    @PostMapping("/portfolios")
    public ResponseEntity<List<ElementDTO>> getAuthenticatedUserPortfolios(Authentication authentication){
        return new ResponseEntity<>(userService.getUserPortfolios(authentication.getName()), HttpStatus.OK);
    }

}
